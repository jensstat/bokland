<!-- src/components/ControlsBar.svelte -->
<script>
    export let showFilters;
    export let toggleFilters;
    export let selectedSort;
    export let onSortChange;
    export let isGridView = true;
    export let onToggleView;
    export let searchTerm;
  </script>

<div class="controls-bar flex justify-around">
  <!--  Search Bar-->
  <div class="search-bar my-2 flex">
    
    <input
        type="text"
        placeholder="Search by title..."
        bind:value={searchTerm}
        class="px-4 py-2 border border-gray-300 rounded-lg w-full lg:max-w-xs"
    />
</div>

  <!-- Sort Dropdown -->
  <select bind:value={selectedSort} on:change={onSortChange} class="sort-dropdown">
    <option value="title">Sort by Title</option>
    <option value="author">Sort by Author</option>
    <option value="year">Sort by Year</option>
    <option value="goodreads">Sort by GoodReads</option>

  </select>

  <!-- Filter Button -->
  <button class="filter-btn" on:click={toggleFilters}>
    {showFilters ? 'Hide Filters' : 'Show Filters'}
  </button>

  <!-- List/Grid Toggle -->
  <button class="toggle-view-btn" on:click={onToggleView}>
    {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
  </button>
</div>
  