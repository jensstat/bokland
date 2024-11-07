<script>
    import AddBookForm from "./addBookForm.svelte";

    export let data;  // `data` contains the books array
    let showAddBookForm = false;

    // Toggle to show/hide the add book form
    function toggleAddBookForm() {
        showAddBookForm = !showAddBookForm;
    }

    // Handler for adding a book to the `books` list
    function handleAddBook(event) {
        const { newBook } = event.detail;
        data.books = [...data.books, newBook];  // Append the new book to `data.books`
    }

    // Delete function using book ID
    async function deleteBook(id) {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/delete-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            data.books = data.books.filter(book => book.id !== id);  // Remove the book locally
        } else {
            const errorData = await response.json();
            console.error('Failed to delete book:', errorData.error || 'Unknown error');

            // Check if the error is due to token expiration
            if (errorData.error === 'jwt expired') {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                // Optionally, redirect to login page
            }

        }
    }
</script>

<!-- Container to keep button and form aligned -->
<div class="flex items-start mb-4 gap-4 justify-end">
    <!-- Form aligned to the left of the button, remains hidden until toggle -->
    {#if showAddBookForm}
        <div class="w-3/4"> <!-- Adjust width as needed to control form size -->
            <AddBookForm on:addBook={handleAddBook} />
        </div>
    {/if}

    <!-- Toggle button remains on the right side -->
    <button on:click={toggleAddBookForm} class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition">
        {showAddBookForm ? 'Cancel' : 'Add Book'}
    </button>
</div>

<!-- Book Table -->
<table class="w-full border">
    <thead>
        <tr>
            {#each Object.keys(data.books[0] || {}) as key}
                <th class="border p-2">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            {/each}
            <th class="border p-2">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each data.books as book}
            <tr>
                {#each Object.keys(book) as key}
                    <td class="p-2 border">
                        <input type="text" bind:value={book[key]} class="w-full border p-1" />
                    </td>
                {/each}
                <td class="p-2 border">
                    <button on:click={() => deleteBook(book.id)} class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition">
                        Delete
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
