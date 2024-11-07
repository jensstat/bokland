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
        title = author = year = genre = language = goodreads = tags = jensrating = cover_url = series = ''; // Clear form
        hasRead = 'ikkeLest';
        errorMessage = ''; // Clear any previous error messages
    } else {
        errorMessage = result.error || 'An error occurred';

        // Check if the error is due to token expiration
        if (result.error === 'jwt expired') {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('token');
            errorMessage = 'Session expired. Please log in again.';
            // Optionally, redirect to login page here
        }
    }
}

</script>

<form on:submit={handleAddBook} class="space-y-4 bg-white p-6 rounded-lg w-3/4 shadow-md">
    <h2 class="text-lg font-bold">Add New Book</h2>
    <input type="text" bind:value={title} placeholder="Title" required class="input" />
    <input type="text" bind:value={author} placeholder="Author" required class="input" />
    <input type="number" bind:value={year} placeholder="Year" class="input" />
    <input type="text" bind:value={type} placeholder="Type" class="input"/>
    <input type="text" bind:value={genre} placeholder="Genre" class="input"/>
    <input type="text" bind:value={language} placeholder="Language" class="input"/>
    <input type="number" step="any" bind:value={goodreads} placeholder="Goodreads Rating" class="input"/>
    <input type="text" bind:value={tags} placeholder="Tags" class="input"/>
    <input type="text" bind:value={hasRead} placeholder="Has Read Status" class="input"/>
    <input type="number" bind:value={jensrating} placeholder="Jens Rating" class="input"/>
    <input type="text" bind:value={series} placeholder="Series" class="input"/>

    {#if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {/if}
    {#if successMessage}
        <p class="text-green-500">{successMessage}</p>
    {/if}
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Book</button>
</form>
