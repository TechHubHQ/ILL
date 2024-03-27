import os
import sys
import logging
import hashlib

root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_dir)
from Backend.Connections.ILconDBConnector import connect_to_db

# Set up logging to stdout
logging.basicConfig(stream=sys.stdout, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

db_con = connect_to_db()


def validate_registration(username, email, phone, password, confirm_password):
    logging.info(f"Validating registration for {username}")
    # Validate username
    if not username:
        return {"message": "Username is required"}

    # Validate email
    if not email:
        return {"message": "Email is required"}

    # Validate phone
    if not phone:
        return {"message": "Phone number is required"}

    # Validate password
    if not password:
        return {"message": "Password is required"}

    # Check if passwords match
    if password != confirm_password:
        return {"message": "Passwords do not match"}

    try:
        cursor = db_con.cursor()

        # Check if the username already exists
        query_username = """
            SELECT * FROM ill_users WHERE username = ?
        """
        cursor.execute(query_username, (username,))
        existing_username = cursor.fetchone()
        if existing_username:
            return {"message": "Username already exists"}

        # Check if email already exists
        query_email = """
            SELECT * FROM ill_users WHERE email = ?
        """
        cursor.execute(query_email, (email,))
        existing_email = cursor.fetchone()
        if existing_email:
            return {"message": "Email already exists"}

        # Check if the password is strong enough
        if len(password) < 8:
            return {"message": "Password is too short"}
        if not any(char.isdigit() for char in password):
            return {"message": "Password must contain at least one digit"}
        if not any(char.isupper() for char in password):
            return {"message": "Password must contain at least one uppercase letter"}
        if not any(char.islower() for char in password):
            return {"message": "Password must contain at least one lowercase letter"}
        if not any(char in "!@#$%^&*()_+" for char in password):
            return {"message": "Password must contain at least one special character"}
        if username in password:
            return {"message": "Password cannot contain username"}
        if email in password:
            return {"message": "Password cannot contain email"}

        # All validations passed
        logging.info(f"Registration for {username} validated successfully")
        return None

    except Exception as e:
        logging.error(f"Error validating registration for {username}: {str(e)}")
        return {"message": f"Error: {str(e)}"}


def register_user(username, email, phone, role, password, confirm_password):
    logging.info(f"Registering user {username}")
    validation_result = validate_registration(username, email, phone, password, confirm_password)
    if validation_result:
        return validation_result

    try:
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        cursor = db_con.cursor()
        query = """
            INSERT INTO ill_users (username, email, password, role, phone)
            VALUES (?, ?, ?, ?, ?)
        """
        cursor.execute(query, (username, email, hashed_password, role, phone))
        db_con.commit()
        logging.info(f"User {username} registered successfully")
        return {"message": "Registration successful"}
    except Exception as e:
        logging.error(f"Error registering user {username}: {str(e)}")
        return {"message": f"Error: {str(e)}"}


def login_user(email, password):
    logging.info(f"Logging in user {email}")
    try:
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        cursor = db_con.cursor()
        query = """
            SELECT * FROM ill_users
            WHERE email = ? AND password = ?
        """
        cursor.execute(query, (email, hashed_password))
        user = cursor.fetchone()
        if user:
            user_id = user[1]
            return {"message": "Login successful", "user_id": user_id}
        else:
            return {"message": "Invalid email or password"}
    except Exception as e:
        logging.error(f"Error logging in user {email}: {str(e)}")
        return {"message": f"Error: {str(e)}"}
