<script>
    export let selectedType;
    export let selectedLanguage;
    export let selectedGenre;
    export let selectedRead;
    export let showFilters;
    export let resetFilters;
</script>

{#if showFilters}
<div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 m-4">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- Fiction/Non-fiction Filter -->
        <select 
            bind:value={selectedType}
            class="flex-grow sm:flex-none w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700">
            <option value="">Fiction and Non-Fiction</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
        </select>

        <!-- Language Filter -->
        <select 
            bind:value={selectedLanguage}
            class="flex-grow sm:flex-none w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700">
            <option value="">All Languages</option>
            <option value="Engelsk">English</option>
            <option value="Norsk">Norwegian</option>
        </select>

        <!-- Genre Filter -->
        <select 
            bind:value={selectedGenre}
            class="flex-grow sm:flex-none w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700">
            <option value="">Alle sjangre</option>
            <option value="Selv-hjelp">Selv-hjelp</option>
            <option value="Forskning">Forskning</option>
            <option value="Filosofi">Filosofi</option>
            <option value="Psykologi">Psykologi</option>
            <option value="Biografi">Biografi</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Historie">Historie</option>
            <option value="Business">Business</option>
            <option value="Helse">Helse</option>
            <option value="Dystopisk">Dystopisk</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantisk">Romantisk</option>
            <option value="Noveller">Novelle</option>
            <option value="Klassiker">Klassiker</option>
            <option value="Krim">Krim</option>
            <option value="Roman">Roman</option>
            <option value="Historisk fiksjon">Historisk fiksjon</option>
            <option value="Science Fiction">Psykologi</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Humor">Humor</option>
            <option value="Horror">Horror</option>
        </select>

        <!-- Read Status Filter -->
        <select 
            bind:value={selectedRead}
            class="flex-grow sm:flex-none w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700">
            <option value="">Lest/ikke lest</option>
            <option value="Lest">Har lest</option>
            <option value="Ikke lest">Har ikke lest</option>
        </select>

        <!-- Reset Button -->
        <button 
            class="reset-btn bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition w-full sm:w-auto"
            on:click={resetFilters}
        >
            Reset Filters
        </button>
    </div>
</div>
{/if}
