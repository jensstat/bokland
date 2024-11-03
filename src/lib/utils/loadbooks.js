// src/lib/utils/loadBooks.js
import { query } from './mysql';
import { fetchCover } from './fetchCover';

export async function loadBooks() {
  try {
    const books = await query('SELECT * FROM books');

    const updatedBooks = await Promise.all(
      books.map(async (book) => {
        if (!book.cover_url) {
          const coverUrl = await fetchCover(book.title);
          if (coverUrl) {
            await query('UPDATE books SET cover_url = ? WHERE id = ?', [coverUrl, book.id]);
            return { ...book, cover_url: coverUrl };
          }
        }
        return book;
      })
    );

    return updatedBooks;
  } catch (error) {
    console.error('Error fetching or updating books:', error);
    return [];
  }
}
