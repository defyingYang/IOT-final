# init_db.py
import sqlite3

DB_PATH = "database.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # sessions：紀錄每次鎖機的起訖時間、長度與狀態
    c.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time TEXT,
        end_time TEXT,
        duration_minutes INTEGER,
        status TEXT
    )
    """)

    # emergency_logs：緊急解鎖申請與是否批准
    c.execute("""
    CREATE TABLE IF NOT EXISTS emergency_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time TEXT,
        reason TEXT,
        approved INTEGER
    )
    """)

    conn.commit()
    conn.close()
    print("資料庫初始化完成：", DB_PATH)

if __name__ == "__main__":
    init_db()
