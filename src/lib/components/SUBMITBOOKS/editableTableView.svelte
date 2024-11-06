<script>
    import AddBookForm from "./addBookForm.svelte";

    export let data;  // `data` contains the books array
    let showAddBookForm = false;

    function toggleAddBookForm() {
        showAddBookForm = !showAddBookForm;
    }

    function handleAddBook(event) {
        const { newBook } = event.detail;
        data.books = [...data.books, newBook];  // Append the new book to `data.books`
    }

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
        }
    }
</script>
<div class="overflow-x-auto">
    <table class="w-full border text-xs sm:text-sm md:text-base">
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
                            <input 
                                type="text" 
                                value={book[key]} 
                                on:change={(e) => handleEdit(book.id, key, e.target.value)} 
                                class="w-full border p-1 text-xs sm:text-sm" 
                            />
                        </td>
                    {/each}
                    <td class="p-2 border">
                        <button 
                            on:click={() => deleteBook(book.id)} 
                            class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
