<script>
    export let favoriteBooks = [];
    let randomFavoriteBooks = favoriteBooks
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
</script>

<!-- Slideshow container with horizontal scrolling -->
<div class="slideshow-container flex overflow-x-auto whitespace-nowrap scroll-smooth max-w-screen-lg mx-auto space-x-4 py-4">

    <!-- Display 5 random favorite books in a horizontal row -->
    {#each randomFavoriteBooks as book}
        <div class="w-48 h-64 bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-between">
            <img src={book.cover_url} alt={book.title} class="w-full h-40 object-cover rounded-md" />
            <div class="text-c≈enter mt-2">
                <p class="text-white font-semibold truncate">{book.title}</p>
                <p class="text-gray-400 text-sm truncate">{book.author}</p>
            </div>
        </div>
    {/each}

</div>
