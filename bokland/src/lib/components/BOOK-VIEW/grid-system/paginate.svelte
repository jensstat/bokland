<script>
    export let currentPage;
    export let totalPages;
    export let prevPage;
    export let nextPage;
</script>

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
