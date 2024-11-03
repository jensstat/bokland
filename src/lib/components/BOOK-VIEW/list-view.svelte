<script>
    export let sortedBooks;

    // Pagination state
    let currentPage = 1;
    let booksPerPage = 10;

    $: totalPages = Math.ceil(sortedBooks.length / booksPerPage); 
    $: paginatedBooks = sortedBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

    // Pagination Functions
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }
</script>

<div class="list-view-container">
     
    {#each paginatedBooks as book}
    <div class="flex items-center p-2 border-b border-gray-300 ">
        <!-- Book Cover -->
        <img 
            src={book.cover_url || '../images/placeholder.png'} 
            alt={book.title} 
            class="w-16 h-24 object-cover rounded mr-4" 
        />
        <div class="flex flex-col">
        <!-- Book Info -->
            <div>
                <!-- Book Title -->
                <p class="text-lg font-semibold">{book.title}</p>
            </div>
            <div class="flex flew-row">
                <div>
                    <!-- Book Author -->
                    <p class="text-sm text-gray-600">{book.author}</p>
                    
                    <!-- Book Year -->
                    <p class="text-sm text-gray-500">{book.year}</p>
                </div>
                <div>
                    <!-- Book Author -->
                    <p class="text-sm text-gray-600">{book.goodreads.toFixed(2)}</p>
                    
                    <!-- Book Year -->
                    <p class="text-sm text-gray-500">{book.genre}</p>
                </div>
            </div>
            
        </div>
    </div>
    {/each}

    <!-- Pagination Controls -->
    <div class="flex justify-center items-center my-6">
        <button 
            class="px-4 py-2 bg-gray-800 h-12 text-white rounded-lg hover:bg-red-500 transition-all duration-300 ease-in-out disabled:bg-gray-500" 
            on:click={prevPage} 
            disabled={currentPage === 1}>
            Previous
        </button>

        <span class="mx-4 text-gray-800 text-lg">Page {currentPage} of {totalPages}</span>

        <button 
            class="px-4 py-2 bg-gray-800 h-12 text-white rounded-lg hover:bg-red-500 transition-all duration-300 ease-in-out disabled:bg-gray-500" 
            on:click={nextPage} 
            disabled={currentPage === totalPages}>
            Next
        </button>
    </div>
</div>
