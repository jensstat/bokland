// src/routes/+page.server.js
import { loadBooks } from '$lib/utils/loadbooks';

export async function load() {
  const books = await loadBooks();
  return { books };
}
