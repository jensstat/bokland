<script>
    export let data;
    export let formData;
    export let editing;

    const { books } = data;

    // Variable to hold the initial value when an input is focused
    let originalValue = null;

    // Function to handle edit and send updated data to the server
    async function handleEdit(id, field, newValue) {
        console.log("Blur event triggered. Attempting to edit:", { id, field, newValue, originalValue });

        // Compare the original value with the new value
        if (newValue === originalValue) {
            console.log("No change detected, request not sent.");
            return; // Exit if no change detected
        }

        // Check token before making the request
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found. User might need to log in.");
            return;
        }

        try {
            console.log("Sending fetch request to update book...");
            const response = await fetch('/api/update-book', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id, field, value: newValue })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                console.log("Update successful:", result);
                // Update the local book data to reflect the change
                const book = books.find(b => b.id === id);
                if (book) book[field] = newValue;
            } else {
                console.error("Failed to update:", result.error);
                if (response.status === 401 || response.status === 403) {
                    console.error("Authorization error, clearing token.");
                    localStorage.removeItem('token');
                    alert("Session expired. Please log in again.");
                }
            }
        } catch (error) {
            console.error("Error updating book:", error);
        }
    }
</script>

<table class="w-full border">
    <thead>
        <tr>
            {#each Object.keys(formData) as key}
                <th class="border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each books as book}
            <tr>
                {#each Object.keys(formData) as key}
                    <td class="p-2 border">
                        <input
                            type="text"
                            bind:value={book[key]}
                            on:focus={(e) => {
                                originalValue = e.target.value; // Store the original value on focus
                                console.log("Original value set:", originalValue);
                            }}
                            on:blur={(e) => handleEdit(book.id, key, e.target.value)}
                            class="w-full"
                        />
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
