// src/lib/utils/loadBooks.js
import { query } from './mysql';
import { fetchCover } from './fetchCover';

export async function loadBooks() {
  try {


    // Attempt to fetch all books from the database
    const books = await query('SELECT * FROM books');

    // Process each book individually, catching errors at each step to allow the loop to continue
    const updatedBooks = await Promise.all(
      books.map(async (book) => {
        try {
          if (!book.cover_url) {
            const coverUrl = await fetchCover(book.title);
            if (coverUrl) {
              // Update the book in the database if a cover URL is found
              await query('UPDATE books SET cover_url = ? WHERE id = ?', [coverUrl, book.id]);
              return { ...book, cover_url: coverUrl };
            }
          }
          return book; // Return the book as-is if no cover update is needed
        } catch (bookError) {
          console.error('Error processing book with ID ${book.id}:', bookError);
          return book; // Skip the update for this book and return it unchanged
        }
      })
    );

    return updatedBooks;
  } catch (error) {
    // Log and handle the general error, such as a database connection failure
    console.error('Error fetching books from the database:', error);
    return []; // Return an empty array to avoid application crashes
  }
}
