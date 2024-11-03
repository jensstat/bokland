import pandas as pd
import mysql.connector

# Load the CSV file
file_path = 'bokData.csv'
df = pd.read_csv(file_path, sep=";")

# Replace 'NaN' values with None (which MySQL will treat as NULL)
df = df.where(pd.notnull(df), None)

# Connect to MySQL
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='books_db'
)
cursor = connection.cursor()

# Step 1: Delete all records from the table
delete_query = "DELETE FROM Books"
cursor.execute(delete_query)
connection.commit()  # Make sure the deletion is committed

print("All records deleted from Books table.")

# Step 2: Insert new records from the CSV file
insert_query = """
    INSERT INTO Books (title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

for index, row in df.iterrows():
    title = row['title']
    author = row['author']
    year = row['year']
    book_type = row['type']
    genre = row['genre']
    language = row['language']
    goodreads = row['goodreads']
    tags = row['tags']
    has_read = row.get('hasRead', 0)  # Default to 0 if 'hasRead' is missing
    jensrating = row.get('jensrating', None)  # Handle NaN for jensrating
    cover_url = row.get('cover_url', None)  # Handle blank cover_url as None
    series = row.get('series', None)  # Handle NaN or missing series as None

    # Insert the row into the database
    cursor.execute(insert_query, (title, author, year, book_type, genre, language, goodreads, tags, has_read, jensrating, cover_url, series))

# Commit the transaction
connection.commit()

# Close the connection
cursor.close()
connection.close()

print("All records from CSV inserted into Books table.")