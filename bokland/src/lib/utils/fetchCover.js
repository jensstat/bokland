const apiKey = 'AIzaSyAy7nGCl4gy3uOD1UD1P81atNMDpa0FAwg'

export async function fetchCover(bookTitle) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${apiKey}`);
        const data = await response.json();
        if (data.items?.length) {
            // Loop through the items and return the first thumbnail found
            for (const item of data.items) {
                if (item.volumeInfo?.imageLinks?.thumbnail) {
                    return item.volumeInfo.imageLinks.thumbnail;
                }
            }
        }
        return null;
    } catch (error) {
        console.error(`Error fetching cover for ${bookTitle}:`, error);
        return null;
    }
}


