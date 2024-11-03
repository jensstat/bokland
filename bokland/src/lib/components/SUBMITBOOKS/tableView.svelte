<!-- src/routes/submitbooks/TableView.svelte -->
<script>
    export let data;
    const { books } = data;
    export let formData; // Receive the column specification
</script>

<div class="w-full overflow-x-auto">
    <table class="w-full border">
        <thead>
            <tr class="bg-gray-200 border border-gray-300 p-2">
                <!-- Render headers based on formData keys -->
                {#each Object.keys(formData) as key}
                    <th class="border">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each books as book, index}
                <tr class="text-sm even:bg-gray-100 odd:bg-white hover:bg-gray-300">
                    <!-- Render cells based on formData keys -->
                    {#each Object.keys(formData) as key}
                        <td class="p-2 border text-center">
                            {#if key === 'goodreads'}
                                {parseFloat(book[key]).toFixed(2)}
                            {:else}
                                {book[key]}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
