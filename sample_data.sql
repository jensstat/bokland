-- sample_data.sql

TRUNCATE TABLE books;

INSERT INTO books (id, title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series)
VALUES 
    (1, 'Sample Book 1', 'Author A', 2022, 'Fiction', 'Fantasy', 'Norsk', 4.25, 'sample, test', 'ikke lest', 5, 'https://www.google.no', 'Nei'),
    (2, 'Sample Book 2', 'Author B', 2021, 'Non-Fiction', 'Science', 'Engelsk', 3.85, 'sample, test', 'Lest', 4, 'https://www.google.no', 'Series A'),
    (3, 'Sample Book 3', 'Author C', 2019, 'Fiction', 'Drama', 'Norsk', 4.5, 'example, drama', 'ikke lest', 3, 'https://www.google.no', 'Series B'),
    (4, 'Learning Svelte', 'Author D', 2020, 'Non-Fiction', 'Technology', 'Norsk', 4.75, 'tech, web development', 'Lest', 5, 'https://www.google.no', 'Nei'),
    (5, 'Mystery of the Lake', 'Author E', 2018, 'Fiction', 'Mystery', 'French', 4.0, 'mystery, thriller', 'ikke lest', 3, 'https://www.google.no', 'Nei'),
    (6, 'The Cooking Guide', 'Author F', 2022, 'Non-Fiction', 'Cooking', 'Spanish', 3.9, 'cooking, recipes', 'Lest', 4, 'https://www.google.no', 'Nei'),
    (7, 'Space Explorations', 'Author G', 2015, 'Non-Fiction', 'Science', 'Norsk', 4.6, 'science, space', 'ikke lest', 5, 'https://www.google.no', 'Nei'),
    (8,'Poetry of the Heart', 'Author H', 2017, 'Fiction', 'Poetry', 'Norsk', 3.75, 'poetry, literature', 'Lest', 4, 'https://www.google.no', 'Series C'),
    (9,'Norwegian Folktales', 'Author I', 2005, 'Fiction', 'Folktales', 'Norwegian', 4.3, 'folktales, culture', 'ikke lest', 3, 'https://www.google.no', 'Series D'),
    (10,'JavaScript Essentials', 'Author J', 2021, 'Non-Fiction', 'Programming', 'Norsk', 4.8, 'programming, javascript', 'Lest', 5, 'https://www.google.no', 'Nei');
