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


def register_sport(std_name, std_department, sport, gender):
    logging.info(f"*** Initiating Sports Registration for {std_name} ***")
    try:
        cursor = db_con.cursor()
        query = """
            INSERT INTO sports_details (std_name, std_department, sport, gender)
            VALUES (?, ?, ?, ?)
        """
        cursor.execute(query, (std_name, std_department, sport, gender))
        db_con.commit()
        logging.info(f"Sports Registration successful for {std_name} for sport {sport}")
        return {"message": "Sports Registration Successful"}
    except Exception as exc:
        logging.error(f"Exception while registering {std_name} see below\n{exc}")
        return 0


def get_sports(username):
    logging.info(f"Fetching Sports details for user {username}")
    try:
        cursor = db_con.cursor()
        query = """
            SELECT * FROM sports_details
            WHERE std_name = ?
        """
        cursor.execute(query, (username,))
        sports = cursor.fetchall()
        logging.info(f"Fetched User sports details {sports}")
        return sports
    except Exception as exc:
        logging.error(f"Exception while fetching sports for {username} \n{exc}")
        return 0


def save_idea(username, idea, submitted_on):
    logging.info(f"*** Initiating save_idea for {username} ***")
    try:
        cursor = db_con.cursor()
        query = """
            INSERT INTO idea_details (username, idea, submitted_on)
            VALUES (?, ?, ?)
        """
        cursor.execute(query, (username, idea, submitted_on))
        db_con.commit()
        logging.info(f"Idea Saved Successfully")
        return {"message": "Idea Submitted Successfully"}
    except Exception as exc:
        logging.error(f"Exception while saving idea {username} -- {idea} see below\n{exc}")
        return 0


def get_ideas(username):
    logging.info(f"Getting User saved ideas for {username}")
    try:
        cursor = db_con.cursor()
        query = """
            SELECT idea, submitted_on FROM idea_details
            WHERE username = ?
        """
        cursor.execute(query, (username,))
        ideas = cursor.fetchall()
        logging.info(f"Fetched User saved Ideas\n{ideas}")
        return ideas
    except Exception as exc:
        logging.error(f"Exception while getting ideas {username} see below\n{exc}")
        return {}
