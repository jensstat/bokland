<script>
    export let book;
    export let placeholder;

    import { toggleReadStatus } from '../../../utils/updateReadStatus'

    // Function to generate star ratings based on the Goodreads rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        return Array(fullStars).fill('full').concat(Array(halfStar).fill('half'));
    }

    async function handleReadToggle() {
        book.hasRead = book.hasRead === "Lest" ? "Ikke lest" : "Lest";
        await toggleReadStatus(book.id, book.hasRead); // Update the read status in the database
    }
</script>

<div class="relative w-40 h-auto bg-gray-300 dark:bg-white rounded-md border p-2 flex flex-col items-center overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
    <!-- Hover Overlay -->
    <div class="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
        {#if book.goodreads}
        <!-- Star Rating on Hover -->
        <div class="flex items-center space-x-1 mb-2">
            {#each generateStars(book.goodreads) as star}
                {#if star === 'full'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .587l3.668 7.429L23 9.75l-5.539 5.393 1.306 7.627L12 18.897l-6.767 3.573L6.54 15.144 1 9.75l7.332-1.734L12 .587z"/>
                    </svg>
                {:else if star === 'half'}
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .587l3.668 7.429L23 9.75l-5.539 5.393 1.306 7.627L12 18.897l-6.767 3.573L6.54 15.144 1 9.75l7.332-1.734L12 .587z" fill-opacity="0.5"/>
                    </svg>
                {/if}
            {/each}
            <span class="text-sm font-bold text-white ml-2">{book.goodreads.toFixed(2)}</span>
        </div>
        {/if}

        <!-- More Book Info in Hover -->
        <div class="text-center">
            <p class="text-xs text-gray-300">Genre: {book.genre}</p>
            <p class="text-xs text-gray-300">Language: {book.language}</p>
            {#if book.hasRead === "Lest"}
                <p class="text-xs text-green-400">Read</p>
            {:else}
                <p class="text-xs text-red-400">Not Read</p>
            {/if}
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded" on:click={handleReadToggle}>
                {book.hasRead === "Lest" ? "Mark as Unread" : "Mark as Read"}
            </button>
        </div>
    </div>
    
    <!-- Book Cover -->
    <img 
        src={book.cover_url || placeholder}
        alt={`Cover of ${book.title}`} 
        class="object-cover w-full h-40 rounded-md"
        onerror="this.src={placeholder}"  
    />

    <!-- Book Title -->
    <p class="text-sm font-semibold text-center mt-2 truncate w-full" title={book.title}>
        {book.title}
    </p>

    <!-- Book Author -->
    <p class="text-xs text-center truncate w-full" title={book.author}>
        {book.author}
    </p>

    <!-- Toggle Button for 'hasRead' status -->
</div>
