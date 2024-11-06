<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let title = '';
    let author = '';
    let year = '';
    let type = 'Fiction';
    let genre = '';
    let language = '';
    let goodreads = '';
    let tags = '';
    let hasRead = 'ikkeLest';
    let jensrating = '';
    let cover_url = '';
    let series = '';
    let errorMessage = '';
    let successMessage = '';

    async function handleAddBook(event) {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('/api/add-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series })
        });

        const result = await response.json();
        if (response.ok) {
            const newBook = { id: result.id, title, author, year, type, genre, language, goodreads, tags, hasRead, jensrating, cover_url, series };
            dispatch('addBook', { newBook });
            successMessage = 'Book added successfully';
            title = author = year = genre = language = goodreads = tags = jensrating = cover_url = series = '';
            hasRead = 'ikkeLest';
        } else {
            errorMessage = result.error || 'An error occurred';
        }
    }
</script>

<form on:submit={handleAddBook} class="space-y-4 bg-white p-4 lg:p-6 rounded-lg w-full sm:w-3/4 shadow-md">
    <h2 class="text-lg font-bold">Add New Book</h2>
    <input type="text" bind:value={title} placeholder="Title" required class="input w-full" />
    <input type="text" bind:value={author} placeholder="Author" required class="input w-full" />
    <input type="number" bind:value={year} placeholder="Year" class="input w-full" />
    <input type="text" bind:value={type} placeholder="Type" class="input w-full"/>
    <input type="text" bind:value={genre} placeholder="Genre" class="input w-full"/>
    <input type="text" bind:value={language} placeholder="Language" class="input w-full"/>
    <input type="number" bind:value={goodreads} placeholder="Goodreads Rating" class="input w-full"/>
    <input type="text" bind:value={tags} placeholder="Tags" class="input w-full"/>
    <input type="text" bind:value={hasRead} placeholder="Has Read Status" class="input w-full"/>
    <input type="number" bind:value={jensrating} placeholder="Jens Rating" class="input w-full"/>
    <input type="text" bind:value={series} placeholder="Series" class="input w-full"/>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}
    {#if successMessage}
        <p class="text-green-500">{successMessage}</p>
    {/if}
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto">
        Add Book
    </button>
</form>

