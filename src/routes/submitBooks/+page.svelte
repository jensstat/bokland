<script>
    import { onMount } from 'svelte';
    import { isEditing } from '../../stores/editMode';
    import TableView from '$lib/components/SUBMITBOOKS/tableView.svelte';
    import EditableTableView from '$lib/components/SUBMITBOOKS/editableTableView.svelte';
    import Login from '$lib/components/Login.svelte';

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
    let editing = false;
    let showEditableView = false;

    onMount(() => {
        const token = localStorage.getItem('token');
        if (token) {
            isEditing.set(true);
            console.log('Token found, edit mode enabled');
        }
    });

    $: isEditing.subscribe(value => {
        editing = value;
        console.log('Edit mode active:', editing);
    });

    function logout() {
        localStorage.removeItem('token');
        isEditing.set(false);
        console.log('Logged out, edit mode disabled');
    }

    function toggleView() {
        showEditableView = !showEditableView;
    }
</script>

<div class="flex justify-between items-center p-6 bg-gray-100 border-b border-gray-300 shadow-md">
    <!-- Logo / Title -->
    <h1 class="text-2xl font-bold text-gray-700">Bokoversikt</h1>

    <!-- Login/Logout and View Toggle Buttons -->
    <div class="flex gap-4">
        {#if editing}
            <button on:click={logout} class="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition">
                Log Out
            </button>
        {:else}
            <Login />
        {/if}

        <!-- Toggle Table View Button -->
        {#if editing}
            <button on:click={toggleView} class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
                {showEditableView ? 'Switch to Table View' : 'Switch to Editable Table View'}
            </button>
        {/if}
    </div>
</div>

<div class="p-6">
    <!-- Display Table or Editable Table -->
    {#if showEditableView && editing}
        <EditableTableView {data} {formData} {editing} class="shadow-lg rounded-md overflow-hidden border border-gray-200" />
    {:else}
        <TableView {data} {formData} class="shadow-lg rounded-md overflow-hidden border border-gray-200" />
    {/if}
</div>
