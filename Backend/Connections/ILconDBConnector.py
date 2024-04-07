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
    global db_conn

    if db_conn is None:
        db_conn = sqlite3.connect(DB_PATH)

    if db_conn:
        try:
            with open(SCHEMA_PATH, 'r') as schema_file:
                schema_sql = schema_file.read()

            cursor = db_conn.cursor()

            # Check if tables already exist
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = cursor.fetchall()
            existing_tables = [table[0] for table in tables]

            # Extract the table names from the schema SQL
            table_names = [line.split()[2] for line in schema_sql.splitlines()
                           if line.strip().startswith("CREATE TABLE")]

            # Check which tables from the schema SQL are not in the existing tables
            tables_to_create = [table for table in table_names if table not in existing_tables]

            if tables_to_create:
                # Tables don't exist, create them
                db_conn.executescript(schema_sql)
                print("Tables created successfully.")
            else:
                print("Tables already exist.")

        except sqlite3.Error as e:
            print(f"Error creating tables: {e}")
    else:
        print("Failed to connect to the database.")
