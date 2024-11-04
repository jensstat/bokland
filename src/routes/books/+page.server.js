// src/routes/+page.server.js
import { loadBooks } from '$lib/utils/LOADBOOKS';

export async function load() {
  const books = await loadBooks();
  return { books };
}
