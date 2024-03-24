from Backend.Connections.ILconDBConnector import connect_to_db, create_tables

db_connector = connect_to_db()

if db_connector:
    create_tables()
    db_connector.close()
else:
    print("Error creating tables")
