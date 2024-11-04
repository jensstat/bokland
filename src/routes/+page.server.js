// src/routes/+page.server.js (root route for landing page)
import { query } from '$lib/utils/mysql';
import { fetchCover } from '$lib/utils/fetchCover';
import { json } from '@sveltejs/kit';

export async function load() {
    try {
      // Fetch all books from database
      const books = await query('SELECT * FROM books');

      let readBooksCount = 0 
      let favoriteBooks = []

      books.forEach(book => {
        if (book.hasRead === 'Lest') {readBooksCount++}
        if (book.jensrating > 4) {favoriteBooks.push(book)}
      });

      const totalBooks = books.length;
      const readBooksPercentage = readBooksCount / totalBooks * 100;
        
      // Fetch covers for the favorite books if they are missing
      const updatedFavoriteBooks = await Promise.all(favoriteBooks.map(async (book) => {
        if (!book.cover_url) {
          const coverUrl = await fetchCover(book.title);
          if (coverUrl) {
            await query('UPDATE books SET cover_url = ? WHERE id = ?', [coverUrl, book.id]);
            book.cover_url = coverUrl;
          }
        }
        return book;
      }));
  
     
      

      return {
        favoriteBooks: updatedFavoriteBooks, // Return only the favorite books
        readBooksPercentage
      };
    } catch (error) {
      console.error('Error fetching favorite books:', error);
      return {
        favoriteBooks: [], readBooksPercentage: 0
      };
    }
  }