<script>
    import BookCard from './grid-system/book-card.svelte';
    import Pagination from './grid-system/paginate.svelte';

    export let sortedBooks;
    const placeholder = '../images/placeholder.png';

    // Pagination state
    let currentPage = 1;
    let booksPerPage = 16;

    // Reset currentPage to 1 whenever sortedBooks changes
    $: if (sortedBooks) {
        currentPage = 1; 
    }

    $: totalPages = Math.ceil(sortedBooks.length / booksPerPage); 
    $: paginatedBooks = sortedBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

    // Pagination Functions
    function prevPage() {
        if (currentPage > 1) currentPage--;
    }

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }
</script>

<div class="flex flex-col flex-grow">
    <!-- Book Grid -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 my-4 m-6">
        {#each paginatedBooks as book}
            <BookCard {book} {placeholder} />
        {/each}
    </div>

    <!-- Pagination Controls -->
    <Pagination {currentPage} {totalPages} {prevPage} {nextPage} />
</div>
