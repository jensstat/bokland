<script>
    import StatisticView from '../../lib/components/STATISTICS/statisticView.svelte';

    export let data;
    const { books } = data;

    let totalBooks = 0;
    let booksRead = 0;
    let percentageRead = 0;
    let percentageNotRead = 0;
    let averageGoodreadsRating = 0;
    let yearCategories = { A: 0, B: 0, C: 0, D: 0 };

    $: totalBooks = books.length;
    $: booksRead = books.filter(book => book.hasRead === 'Lest').length;
    $: percentageRead = totalBooks > 0 ? (booksRead / totalBooks) * 100 : 0;
    $: percentageNotRead = 100 - percentageRead;

    let showMotivating = true;

    function toggleView() {
        showMotivating = !showMotivating;
    }

    let readGenres = {};
    let totalGenres = {};
    let topGenres = [];

    $: {
        readGenres = {};
        totalGenres = {};
        yearCategories = { A: 0, B: 0, C: 0, D: 0 };
        let readRatingSum = 0;
        let readCount = 0;

        books.forEach(book => {
            const genre = book.genre || 'Unknown';
            const year = book.year;

            if (book.hasRead === 'Lest') {
                readGenres[genre] = (readGenres[genre] || 0) + 1;
                readRatingSum += book.goodreads;
                readCount++;
            }
            totalGenres[genre] = (totalGenres[genre] || 0) + 1;

            if (year) {
                if (year < 1500) yearCategories.A++;
                else if (year >= 1500 && year < 1900) yearCategories.B++;
                else if (year >= 1900 && year < 1980) yearCategories.C++;
                else yearCategories.D++;
            }
        });
        
        topGenres = Object.keys(readGenres).map(genre => ({
            genre,
            totalCount: totalGenres[genre],
            readCount: readGenres[genre]
        })).sort((a, b) => b.readCount - a.readCount).slice(0, 3);

        averageGoodreadsRating = readCount ? (readRatingSum / readCount).toFixed(2) : 'N/A';
    }
</script>

<div class="relative flex flex-grow bg-gray-900 justify-center items-stretch flex-col pt-4 lg:pt-6">
    <!-- Toggle Icon positioned in the top-left corner -->
    <button 
        on:click={toggleView} 
        class="absolute top-4 left-4 p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 opacity-75 hover:opacity-100 transition duration-200"
    >
        <!-- Toggle icon placeholder -->
    </button>

    <!-- Main content with conditional rendering based on the toggle -->
    <div class="flex flex-col lg:flex-row justify-around items-stretch h-full">
        <!-- Left Column: 30% Width -->
        <div class="text-white flex flex-col items-center mt-6 lg:mt-0 basis-[30%] h-fullp-4 rounded-lg shadow-lg">
            <span class="text-3xl text-green-400 mb-4">Your Top 3 Genres</span>
            <ul class="flex flex-col space-y-4 w-[90%]">
                {#each topGenres as {genre, totalCount, readCount}}
                    <li class="bg-gray-700 rounded-lg p-4 shadow-md text-center h-full">
                        <span class="font-bold text-xl">{genre}</span>
                        <div class="flex justify-center gap-4 my-2 text-2xl">
                            <div class="bg-green-300 text-black rounded-full w-14 h-14 flex items-center justify-center">{readCount}</div>
                            <div class="bg-red-300 text-black rounded-full w-14 h-14 flex items-center justify-center">{totalCount}</div>
                        </div>
                        <span class="text-gray-400 text-base md:text-xl">Read: <span class="text-green-300">{readCount}</span> out of <span class="text-red-300">{totalCount}</span> books</span> 
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Center Column: 40% Width -->
        <div class="flex flex-col items-center basis-[40%] h-full mx-4">
            {#if showMotivating}
                <StatisticView
                    title="You have read"
                    subtitle="of your books"
                    {totalBooks} 
                    {booksRead} 
                    {percentageRead} 
                    {percentageNotRead}
                    highlightcolor="text-green-400"
                />
                <div class="text-white text-2xl lg:text-3xl flex flex-col items-center mt-4 lg:mt-6 space-y-2">
                    <p class="font-bold text-green-400 text-3xl md:text-4xl mb-2">Well done!</p>
                    <p class="text-base md:text-lg text-gray-400">Keep up the good work and aim for 100%!</p>
                </div>    
            {:else}
                <StatisticView 
                    title="You have not read"
                    subtitle="of your books"
                    {totalBooks} 
                    {booksRead} 
                    {percentageRead} 
                    {percentageNotRead}
                    highlightcolor="text-red-400"
                />
                <div class="text-white text-2xl lg:text-3xl flex flex-col items-center mt-4 lg:mt-6 space-y-2">
                    <p class="font-bold text-red-400 text-3xl md:text-4xl mb-2">Get your head together!</p>
                    <p class="text-base md:text-lg text-gray-400">As <span class="text-red-400">Troy Bolton</span> said: You got to get your head in the game!</p>
                </div>
            {/if}
            <p class="text-white text-lg mt-6 p-4 bg-gray-800 rounded-lg shadow-lg flex items-center justify-center w-full max-w-xs lg:max-w-sm">
                <span class="font-semibold">Average Goodreads Rating:</span>
                <span class="text-green-300 font-bold text-2xl ml-2">{averageGoodreadsRating}</span>
            </p>
        </div>

        <!-- Right Column: 30% Width -->
        <div class="text-white flex flex-col items-center mt-6 lg:mt-0 basis-[30%] h-full p-4 rounded-lg shadow-lg w-[90%]">
            <span class="text-3xl text-green-400 mb-4">Books by Era</span>
            <ul class="space-y-4 w-full ">
                <li class="bg-gray-700 rounded-lg p-4 shadow-md text-center h-full ">
                    <span class="font-bold text-lg">A: Before 1500</span>
                    <p class="text-green-300 text-2xl font-bold mt-2">{yearCategories.A}</p>
                </li>
                <li class="bg-gray-700 rounded-lg p-4 shadow-md text-center h-full">
                    <span class="font-bold text-lg">B: 1500 - 1900</span>
                    <p class="text-green-300 text-2xl font-bold mt-2">{yearCategories.B}</p>
                </li>
                <li class="bg-gray-700 rounded-lg p-4 shadow-md text-center h-full">
                    <span class="font-bold text-lg">C: 1900 - 1980</span>
                    <p class="text-green-300 text-2xl font-bold mt-2">{yearCategories.C}</p>
                </li>
                <li class="bg-gray-700 rounded-lg p-4 shadow-md text-center h-full">
                    <span class="font-bold text-lg">D: 1980 to Today</span>
                    <p class="text-green-300 text-2xl font-bold mt-2">{yearCategories.D}</p>
                </li>
            </ul>
        </div>
    </div>
</div>
