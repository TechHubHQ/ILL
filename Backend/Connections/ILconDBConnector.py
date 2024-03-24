import os
import sqlite3

# Construct the absolute path to the database file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DB_PATH = os.path.join(BASE_DIR, 'DB', 'ILLDB.db')
SCHEMA_PATH = os.path.join(BASE_DIR, 'DB', 'Schema', 'schema.sql')

db_conn = None  # Initialize the connection variable


def connect_to_db():
    """
    Establishes a connection to the SQLite3 database.
    Returns the connection object or None if the connection fails.
    """
    global db_conn  # Declare the global variable

    try:
        db_conn = sqlite3.connect(DB_PATH)
        return db_conn
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
        return None


def create_tables():
    """
    Creates the tables in the database using the schema.sql file.
    """
    global db_conn  # Declare the global variable

    if db_conn is None:
        db_conn = connect_to_db()

    if db_conn:
        try:
            with open(SCHEMA_PATH, 'r') as schema_file:
                schema_sql = schema_file.read()
            db_conn.executescript(schema_sql)
            print("Tables created successfully.")
        except sqlite3.Error as e:
            print(f"Error creating tables: {e}")
    else:
        print("Failed to connect to the database.")
