<script>
  export let showFilters;
  export let toggleFilters;
  export let selectedSort;
  export let onSortChange;
  export let isGridView = true;
  export let onToggleView;
  export let searchTerm;
</script>

<div class="controls-bar flex flex-col lg:flex-row lg:justify-between items-center p-6 bg-gray-100 border-b border-gray-300 shadow-md gap-4">
    <!-- Title -->
    <h1 class="text-xl lg:text-2xl font-bold text-gray-700 mb-2 lg:mb-0">Bøker</h1>

    <!-- Search Bar -->
    <div class="search-bar flex-grow lg:flex-grow-0 w-full lg:w-96">
        <input
            type="text"
            placeholder="Search by title..."
            bind:value={searchTerm}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
    </div>

    <!-- Sort Dropdown -->
    <div class="w-full lg:w-auto">
        <select 
            bind:value={selectedSort} 
            on:change={onSortChange} 
            class="w-full lg:max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700">
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
            <option value="year">Sort by Year</option>
            <option value="goodreads">Sort by GoodReads</option>
        </select>
    </div>

    <!-- Filter Button -->
    <button 
      class="filter-btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition w-full lg:w-32"
      on:click={toggleFilters}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
    </button>

    <!-- List/Grid Toggle -->
    <button 
        class="toggle-view-btn bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full lg:w-36"
        on:click={onToggleView}>
        {isGridView ? 'List View' : 'Grid View'}
    </button>
</div>
