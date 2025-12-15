# app.py
from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta
import sqlite3
import os

app = Flask(__name__)

DB_PATH = "database.db"

# ---- Helper: 取得 DB 連線 ----
def get_db_conn():
    conn = sqlite3.connect(DB_PATH)
    # 讓 cursor 回傳 tuple（預設）即可
    return conn

# ---- 頁面：首頁 ----
@app.route('/')
def home():
    # 你可以從資料庫計算這些統計值，這裡先示範用簡易計算（可擴充）
    conn = get_db_conn()
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM sessions")
    total_sessions = c.fetchone()[0] or 0

    c.execute("SELECT SUM(duration_minutes) FROM sessions")
    total_minutes = c.fetchone()[0] or 0

    conn.close()

    stats = {
        "weekly_hours": round(total_minutes/60, 1),
        "weekly_trend": "+23%",
        "success_count": total_sessions,
        "success_trend": "+5",
        "avg_duration": 42,
        "avg_trend": "+8%"
    }
    return render_template('index.html', stats=stats)

# ---- 頁面：dashboard（從 DB 讀 sessions 與 weekly stats） ----
@app.route('/dashboard')
def dashboard():
    conn = get_db_conn()
    c = conn.cursor()
    c.execute("SELECT id, start_time, end_time, duration_minutes, status FROM sessions ORDER BY id DESC LIMIT 50")
    rows = c.fetchall()
    conn.close()

    # 將 rows 轉成 templates 可用的 dict list
    sessions = []
    for r in rows:
        _, start_time, end_time, duration_minutes, status = r
        sessions.append({
            "date": start_time,
            "duration": f"{duration_minutes} 分鐘",
            "status": status
        })

    # 你原先的 weekly_stats 可以由 sessions 計算，這裡暫時保留範例
    weekly_stats = [
        {"day": "週一", "hours": 0},
        {"day": "週二", "hours": 0},
        {"day": "週三", "hours": 0},
        {"day": "週四", "hours": 0},
        {"day": "週五", "hours": 0},
        {"day": "週六", "hours": 0},
        {"day": "週日", "hours": 0},
    ]

    achievements = {
        "success_rate": 96.5,
        "total_sessions": len(sessions),
        "total_hours": round(sum([s["duration"].split()[0] and int(s["duration"].split()[0]) or 0 for s in sessions])/60 if sessions else 0, 1),
        "streak_days": 28
    }

    return render_template('dashboard.html',
                           achievements=achievements,
                           sessions=sessions,
                           weekly_stats=weekly_stats)

# ---- 頁面：emergency ----
@app.route('/emergency')
def emergency():
    return render_template('emergency.html')

# ---- API: 鎖定手機（寫入 sessions） ----
@app.route('/api/lock', methods=['POST'])
def lock_phone():
    data = request.json or {}
    # duration 可能是分鐘或傳入錯誤，給預設 30
    try:
        duration = int(data.get('duration', 30))
    except:
        duration = 30

    start = datetime.now()
    end = start + timedelta(minutes=duration)

    conn = get_db_conn()
    c = conn.cursor()
    c.execute("""
        INSERT INTO sessions (start_time, end_time, duration_minutes, status)
        VALUES (?, ?, ?, ?)
    """, (start.isoformat(), end.isoformat(), duration, "completed"))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "duration": duration, "message": "手機已鎖定"})

# ---- API: 緊急解鎖（記錄到 emergency_logs） ----
@app.route('/api/emergency-unlock', methods=['POST'])
def emergency_unlock():
    data = request.json or {}
    reason = data.get('reason', '')

    # 簡易關鍵字檢查
    emergency_keywords = ['急', '緊急', '醫院', '生病', '意外', '重要']
    is_emergency = any(keyword in reason for keyword in emergency_keywords)
    approved = 1 if is_emergency else 0

    conn = get_db_conn()
    c = conn.cursor()
    c.execute("""
        INSERT INTO emergency_logs (time, reason, approved)
        VALUES (?, ?, ?)
    """, (datetime.now().isoformat(), reason, approved))
    conn.commit()
    conn.close()

    return jsonify({
        "approved": bool(approved),
        "message": "解鎖已批准" if approved else "解鎖被拒絕"
    })

if __name__ == '__main__':
    # 如果第一次啟動時 DB 不存在，提醒使用者先執行 init_db.py
    if not os.path.exists(DB_PATH):
        print("警告：找不到 database.db，請先執行 python init_db.py 來初始化資料庫。")
    app.run(debug=True, host='0.0.0.0', port=5000)
