import sqlite3

conn = sqlite3.connect("diagnicore.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS records(
    id INTEGER PRIMARY KEY,
    domain TEXT,
    user_name TEXT,
    prediction TEXT,
    risk TEXT,
    confidence INTEGER
)
""")

conn.commit()
conn.close()