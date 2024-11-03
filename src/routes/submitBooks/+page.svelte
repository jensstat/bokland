<!-- src/routes/submitbooks/+page.svelte -->
<script>
    import { isEditing } from '../../stores/editMode';
    import TableView from '../../lib/components/SUBMITBOOKS/tableView.svelte';
    import EditableTableView from '../../lib/components/SUBMITBOOKS/editableTableView.svelte';
    
    export let data; 
    const { books } = data;

    let formData = {
        title: '',
        author: '',
        year: '',
        type: 'Fiction',
        genre: '',
        language: '',
        goodreads: '',
        tags: '',
        hasRead: 'ikkeLest',
        jensrating: '',
        series: 'Nei'
    };

    let displayTable = true;

    let editing;

    $: isEditing.subscribe(value => editing = value);

    function toggleEditMode(){
        isEditing.update(value => !value)
    }


</script>

<button on:click={toggleEditMode}>
    {#if $isEditing}
        Exit Editing Mode
    {:else}
        Edit Table
    {/if}
</button>
   
<!-- <button on:click={() => displayTable = !displayTable}>
    {#if displayTable}
        Add Book
    {:else}
        Show Table
    {/if}
</button> -->


{#if displayTable}
<div class="{$isEditing ? 'bg-red-100' : ''} p-4 min-h-screen">
    {#if $isEditing}
        <EditableTableView {data} {formData}/>
    {:else}
        <TableView {data} {formData}/>
    {/if}
</div>
{/if}
<!-- 
{#if !displayTable}
    <form method="POST">
        {#each Object.keys(formData) as key}
            <label>
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <input type="text" bind:value={formData[key]} name={key} required />
            </label>
        {/each}
    </form>
{/if} -->
