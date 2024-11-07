<script>
    import RandomQuote from './randomQuote.svelte';
    import Slideshow from './slideshow.svelte';
    export let favoriteBooks = [];
    export let readBooksPercentage = 0;
</script>

<div class="flex flex-grow flex-col lg:flex-row items-center w-full bg-white dark:bg-gray-900 p-4 lg:p-0">
    <!-- Left: Text Content -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start mt-6 lg:mt-0 lg:pb-72 lg:pl-32 gap-4 text-center lg:text-left">
        <span class="text-3xl sm:text-4xl lg:text-6xl font-semibold dark:text-red-300">
            Mitt <span class="text-green-400">Kindle</span> Bibliotek
        </span>
        <span class="text-lg sm:text-xl lg:text-2xl font-semibold dark:text-white max-w-xs sm:max-w-sm lg:max-w-none">
            Her finner du en oversikt over alle bøkene på din <span class="text-green-400">Kindle</span>. 
        </span>
    </div>

    <!-- Right: Slideshow & Image -->
    <div class="w-full lg:w-1/2 flex flex-col items-center justify-center py-6 lg:py-10 gap-10">
        <!-- Slideshow -->
        <div class="w-full sm:w-5/6 lg:w-4/5 overflow-hidden">
            <span class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 block text-center lg:text-left">
                Favoritter
            </span>
            <Slideshow {favoriteBooks} />
        </div>
    
        <!-- Reading Progress -->
        <div class="flex flex-col items-center text-green-400">
            <div class="text-lg sm:text-xl lg:text-2xl font-semibold">
                You have read
            </div>
            <div class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold">
                {parseFloat(readBooksPercentage).toFixed(2)}%
            </div>
            <div class="text-lg sm:text-xl lg:text-2xl font-semibold">
                of your books
            </div>
        </div>
    </div>
</div>
