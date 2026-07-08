import os
import sqlite3
import hashlib
from datetime import datetime
from functools import wraps
from flask import (
    Flask, render_template, request, redirect, url_for,
    session, jsonify, g, send_from_directory
)
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'north-garage-default-key')
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'database', 'north_garage.db')

TG_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
TG_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID', '')
ADMIN_LOGIN = os.getenv('ADMIN_LOGIN', 'admin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA journal_mode=WAL")
        g.db.execute("PRAGMA foreign_keys=ON")
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

app.teardown_appcontext(close_db)

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with app.app_context():
        db = get_db()
        db.executescript("""
            CREATE TABLE IF NOT EXISTS applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                car_brand TEXT DEFAULT '',
                service TEXT DEFAULT '',
                preferred_date TEXT DEFAULT '',
                comment TEXT DEFAULT '',
                status TEXT DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                name_en TEXT DEFAULT '',
                name_ru TEXT DEFAULT '',
                price_from REAL DEFAULT 0,
                description TEXT DEFAULT '',
                icon TEXT DEFAULT 'service-icon'
            );
        """)
        admin_exists = db.execute(
            "SELECT id FROM admin_users WHERE login = ?", (ADMIN_LOGIN,)
        ).fetchone()
        if not admin_exists:
            pw_hash = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()
            db.execute(
                "INSERT INTO admin_users (login, password_hash) VALUES (?, ?)",
                (ADMIN_LOGIN, pw_hash)
            )
        services_count = db.execute("SELECT COUNT(*) FROM services").fetchone()[0]
        if services_count == 0:
            default_services = [
                ('Полировка', 'Polishing', 'Полировка', 180, 'Восстановление лакокрасочного покрытия', 'polish-icon'),
                ('Керамика', 'Ceramic Coating', 'Керамика', 350, 'Нано-керамическое покрытие кузова', 'ceramic-icon'),
                ('Оклейка плёнкой', 'PPF Film', 'Оклейка плёнкой', 800, 'Защитная полиуретановая плёнка', 'film-icon'),
                ('Химчистка', 'Dry Cleaning', 'Химчистка', 250, 'Комплексная химчистка салона', 'clean-icon'),
                ('Тонировка', 'Tinting', 'Тонировка', 200, 'Тонировка стёкол любой сложности', 'tint-icon'),
                ('Детейлинг', 'Detailing', 'Детейлинг', 500, 'Полный комплекс детейлинг-услуг', 'detail-icon'),
            ]
            db.executemany(
                "INSERT INTO services (name, name_en, name_ru, price_from, description, icon) VALUES (?,?,?,?,?,?)",
                default_services
            )
        db.commit()

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'admin_logged_in' not in session:
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated

def send_telegram_notification(text):
    if not TG_BOT_TOKEN or not TG_CHAT_ID:
        return False
    try:
        import requests
        url = f"https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage"
        requests.post(url, json={
            'chat_id': TG_CHAT_ID,
            'text': text,
            'parse_mode': 'HTML'
        }, timeout=10)
        return True
    except:
        return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    service = data.get('service', '')
    is_complex = data.get('is_complex', False)
    base_prices = {
        'Полировка': 180, 'Polishing': 180,
        'Керамика': 350, 'Ceramic Coating': 350,
        'Оклейка плёнкой': 800, 'PPF Film': 800,
        'Химчистка': 250, 'Dry Cleaning': 250,
        'Тонировка': 200, 'Tinting': 200,
        'Детейлинг': 500, 'Detailing': 500,
    }
    total = base_prices.get(service, 0)
    if is_complex:
        total = int(total * 0.85)
    return jsonify({'total': total, 'currency': '$'})

@app.route('/api/submit', methods=['POST'])
def submit_application():
    data = request.json
    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    if not name or not phone:
        return jsonify({'success': False, 'error': 'Имя и телефон обязательны'}), 400
    car_brand = data.get('car_brand', '').strip()
    service = data.get('service', '').strip()
    preferred_date = data.get('date', '').strip()
    comment = data.get('comment', '').strip()
    db = get_db()
    cursor = db.execute(
        """INSERT INTO applications (name, phone, car_brand, service, preferred_date, comment)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (name, phone, car_brand, service, preferred_date, comment)
    )
    db.commit()
    tg_msg = (
        f"<b>Новая заявка!</b>\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Автомобиль: {car_brand or 'Не указан'}\n"
        f"Услуга: {service or 'Не указана'}\n"
        f"Дата: {preferred_date or 'Не указана'}\n"
        f"Комментарий: {comment or 'Нет'}"
    )
    send_telegram_notification(tg_msg)
    return jsonify({'success': True, 'id': cursor.lastrowid})

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        login = request.form.get('login', '')
        password = request.form.get('password', '')
        pw_hash = hashlib.sha256(password.encode()).hexdigest()
        db = get_db()
        user = db.execute(
            "SELECT id FROM admin_users WHERE login = ? AND password_hash = ?",
            (login, pw_hash)
        ).fetchone()
        if user:
            session['admin_logged_in'] = True
            session['admin_login'] = login
            return redirect(url_for('admin_dashboard'))
        return render_template('admin/login.html', error='Неверный логин или пароль')
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.clear()
    return redirect(url_for('admin_login'))

@app.route('/admin')
@login_required
def admin_dashboard():
    return render_template('admin/dashboard.html')

@app.route('/api/applications')
@login_required
def get_applications():
    db = get_db()
    search = request.args.get('search', '').strip()
    page = request.args.get('page', 1, type=int)
    per_page = 20
    offset = (page - 1) * per_page
    if search:
        rows = db.execute(
            "SELECT * FROM applications WHERE name LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            (f'%{search}%', per_page, offset)
        ).fetchall()
        total = db.execute(
            "SELECT COUNT(*) FROM applications WHERE name LIKE ?",
            (f'%{search}%',)
        ).fetchone()[0]
    else:
        rows = db.execute(
            "SELECT * FROM applications ORDER BY created_at DESC LIMIT ? OFFSET ?",
            (per_page, offset)
        ).fetchall()
        total = db.execute("SELECT COUNT(*) FROM applications").fetchone()[0]
    applications = [dict(r) for r in rows]
    return jsonify({
        'applications': applications,
        'total': total,
        'page': page,
        'pages': (total + per_page - 1) // per_page
    })

@app.route('/api/applications/<int:app_id>', methods=['DELETE'])
@login_required
def delete_application(app_id):
    db = get_db()
    db.execute("DELETE FROM applications WHERE id = ?", (app_id,))
    db.commit()
    return jsonify({'success': True})

@app.route('/api/stats')
@login_required
def get_stats():
    db = get_db()
    total = db.execute("SELECT COUNT(*) FROM applications").fetchone()[0]
    today = db.execute(
        "SELECT COUNT(*) FROM applications WHERE DATE(created_at) = DATE('now')"
    ).fetchone()[0]
    return jsonify({'total': total, 'today': today})

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static', 'icons'),
        'favicon.svg',
        mimetype='image/svg+xml'
    )

@app.route('/robots.txt')
def robots():
    return "User-agent: *\nAllow: /\nSitemap: https://northgarage.ru/sitemap.xml", 200, {'Content-Type': 'text/plain'}

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
