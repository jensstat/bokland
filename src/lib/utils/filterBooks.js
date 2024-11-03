export function filterBooks(books, selectedType, selectedLanguage, selectedGenre, selectedRead) {
    return books.filter(book => {
        let matchesType = selectedType ? book.type === selectedType : true;
        let matchesLanguage = selectedLanguage ? book.language === selectedLanguage : true;
        let matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
        let matchesReadStatus = selectedRead ? book.hasRead === selectedRead : true;
        return matchesType && matchesLanguage && matchesGenre && matchesReadStatus;
    });
}
