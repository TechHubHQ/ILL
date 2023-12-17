
# ==============================================================================
# Packages or Imports
# ==============================================================================

import smtplib,ssl
import logging
import os
from pathlib import Path
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


# Directory variables
current_file = Path(__file__)
parent_dir = current_file.parent.parent
templates_dir = parent_dir/ "EmailTemplates"
template_path = templates_dir/ "ILiWelcomeEmailTemplate.html"

# Time variables
now = datetime.now()
current_time = now.strftime("%Y-%m-%d %H:%M:%S")

# ==============================================================================
# Triggers Welcome Email to the user when the user registers to ILI
# ==============================================================================

def SendEmail(receiver_email, user_name):
    
    msg = MIMEMultipart()
    from_email = "kalyankanuri497@gmail.com"
    msg['From'] = from_email
    msg['To'] = receiver_email
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465
    
    with open(str(template_path), 'r') as template:
        welcome_mail = template.read()
               
    msg.attach(MIMEText(welcome_mail, "html"))
    
    text = msg.as_string()
    
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        context = ssl.create_default_context()
        server.starttls(context=context)
        server.ehlo()
        server.login(from_email, "Bujjamma@118")
        server.sendmail(from_email, receiver_email, text)
        server.quit()
        print(f"Welcome Email sent to user {user_name} at {current_time} IST")
        
SendEmail("vharish35063@gmail.com", "Harish")