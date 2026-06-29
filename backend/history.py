import sqlite3

def save_record(domain, user, prediction, risk, confidence):

    conn = sqlite3.connect("diagnicore.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO records
        (domain,user_name,prediction,risk,confidence)
        VALUES (?,?,?,?,?)
        """,
        (domain,user,prediction,risk,confidence)
    )

    conn.commit()
    conn.close()