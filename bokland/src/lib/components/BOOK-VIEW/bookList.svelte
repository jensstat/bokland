<script>
    import FilterMenu from "./filterMenu.svelte";
    import ControlsBar from "./controlsBar.svelte";
    import GridView from "./grid-view.svelte";
    import ListView from './list-view.svelte';
    import { filterBooks } from '../../utils/filterBooks';

    let showFilters = false;
    let selectedSort = "title";
    let isGridView = true;

    // State for filters
    let selectedType = "";
    let selectedLanguage = "";
    let selectedGenre = "";
    let selectedRead = "";

    let searchTerm = "";

    export let data; // pass data from parent

    // Apply the filters and sorting in this component
    $: filteredBooks = filterBooks(data.books, selectedType, selectedLanguage, selectedGenre, selectedRead)
    .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // sorting
    $: sortedBooks = [...filteredBooks].sort((a, b) => {
    if (selectedSort === "title") return a.title.localeCompare(b.title);
    if (selectedSort === "author") return a.author.localeCompare(b.author);
    if (selectedSort === "year") return a.year - b.year;
    if (selectedSort === "goodreads") {
        // Handle cases where goodreads rating is missing
        if (!a.goodreads) return 1;  // Push books without ratings to the back
        if (!b.goodreads) return -1; // Push books without ratings to the back
        return b.goodreads - a.goodreads; // Sort by goodreads (highest rating first)
    }
    });


    function toggleFilters() {
        showFilters = !showFilters;
    }
    
    function onSortChange(event) {
        selectedSort = event.target.value;
    }

    function onToggleView() {
        isGridView = !isGridView;
    }

</script>

<!-- Controls Bar -->
<ControlsBar 
    bind:searchTerm
    {showFilters} 
    {toggleFilters} 
    {selectedSort} 
    {onSortChange} 
    {isGridView} 
    {onToggleView} 
/>

<!-- Filter Menu -->
<FilterMenu 
    bind:selectedType={selectedType} 
    bind:selectedLanguage={selectedLanguage} 
    bind:selectedGenre={selectedGenre} 
    bind:selectedRead={selectedRead} 
    {showFilters} 
/>

<!-- Grid/List View -->
{#if isGridView}
    <div class="grid-view">
        <GridView {sortedBooks} />
    </div>
{:else}
    <div class="list-view">
        <ListView {sortedBooks} />
    </div>
{/if}