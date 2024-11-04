// src/routes/submitbooks/+page.server.js
import { loadBooks } from '../../lib/utils/loadBooks';

export async function load() {
  const books = await loadBooks();
  return { books };
}
