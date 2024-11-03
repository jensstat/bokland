<script>
    import { isEditing } from '../../../stores/editMode';
    export let data;
    export let formData;
    console.log("Data received in EditableTableView:", data.books);

    const { books } = data;
    function exitEditing() {
        isEditing.set(false); // Exit edit mode when changes are confirmed
    }

    // Function to handle edit and send updated data to the server
    async function handleEdit(id, field, value) {
    console.log("Sending update request with:", { id, field, value }); // Debugging line

    try {
        const response = await fetch('/api/update-book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, field, value })
        });

        const result = await response.json();
        if (!result.success) {
            console.error('Failed to update:', result.error);
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
}

</script>
<button class="text-green-500 font-bold mb-4">+ Add New Book</button>


<table class="w-full border">
    <thead>
        <tr>
            {#each Object.keys(formData) as key}
                <th class="border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data.books as book}
            <tr>
                {#each Object.keys(formData) as key}
                    <td class="p-2 border">
                        <!-- Editable input field that sends data on blur -->
                        <input
                            type="text"
                            value={book[key]}
                            on:blur={(e) => handleEdit(book.id, key, e.target.value)}
                            class="w-full"
                        />
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>