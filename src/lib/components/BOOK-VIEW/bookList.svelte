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

    export let data;

    $: filteredBooks = filterBooks(data.books, selectedType, selectedLanguage, selectedGenre, selectedRead)
    .filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    $: sortedBooks = [...filteredBooks].sort((a, b) => {
        if (selectedSort === "title") return a.title.localeCompare(b.title);
        if (selectedSort === "author") return a.author.localeCompare(b.author);
        if (selectedSort === "year") return a.year - b.year;
        if (selectedSort === "goodreads") {
            if (!a.goodreads) return 1;
            if (!b.goodreads) return -1;
            return b.goodreads - a.goodreads;
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
    
    function resetFilters() {
        selectedType = "";
        selectedLanguage = "";
        selectedGenre = "";
        selectedRead = "";
        searchTerm = "";
        selectedSort = "title";
    }
</script>

<ControlsBar 
    bind:searchTerm
    {showFilters} 
    {toggleFilters} 
    {selectedSort} 
    {onSortChange} 
    {isGridView} 
    {onToggleView}
/>

<FilterMenu 
    bind:selectedType={selectedType} 
    bind:selectedLanguage={selectedLanguage} 
    bind:selectedGenre={selectedGenre} 
    bind:selectedRead={selectedRead} 
    {showFilters}
    resetFilters={resetFilters} 
/>

{#if isGridView}
    <div class="grid-view flex-grow">
        <GridView {sortedBooks} />
    </div>
{:else}
    <div class="list-view">
        <ListView {sortedBooks} />
    </div>
{/if}
