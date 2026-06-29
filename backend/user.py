import sqlite3


def save_user(domain, data):

    conn = sqlite3.connect("diagnicore.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain TEXT,
        name TEXT,
        age INTEGER,
        details TEXT
    )
    """)

    cursor.execute(
        """
        INSERT INTO users(domain,name,age,details)
        VALUES(?,?,?,?)
        """,
        (
            domain,
            data.get("name"),
            data.get("age"),
            str(data)
        )
    )

    conn.commit()
    conn.close()