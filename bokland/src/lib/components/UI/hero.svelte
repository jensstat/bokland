<script>
    import RandomQuote from './randomQuote.svelte';
    import Slideshow from './slideshow.svelte';
    export let favoriteBooks = [];
    export let readBooksPercentage = 0;

</script>

<div class="flex flex-grow flex-col lg:flex-row items-center w-full bg-white dark:bg-gray-900">
    <!-- Left: Text Content -->
    <div class="md:w-1/2 flex flex-col justify-center items-center lg:justify-normal lg:items-start mt-10 lg:mt-0 lg:pb-72 lg:pl-32 lg:gap-4">
        <span class="lg:text-6xl text-4xl font-semibold dark:text-red-300">
            Mitt <span class="text-green-400 visible lg:hidden">Kindle</span> Bibliotek
        </span>
        <span class="max-lg:hidden lg:display lg:text-2xl text-xl font-semibold dark:text-white">
            Her finner du en oversikt over alle bøkene på din <span class="text-green-400">Kindle</span>. 
        </span>
        <!-- Random Quote-->
        
    </div>

    <!-- Right: Slideshow & Image -->
    <div class="lg:w-1/2 w-4/6 flex flex-col items-center justify-center py-10 gap-14">
        <!-- Slideshow -->
        <div class="w-full lg:w-4/5 overflow-hidden">
            <span class="text-2xl font-bold text-gray-800 dark:text-gray-100
            mb-2 block text-center lg:text-left">
                <a href="#" class="hover:text-blue-700 dark:hover:text-red-300">
                    Favoritter
                </a>
            </span>
            <Slideshow {favoriteBooks}/>
        </div>
    
        <!-- Reading Progress -->
         
        <div class="flex flex-col items-center text-lg lg:text-xl text-green-400">
            
            <div class="text-lg lg:text-xl flex-row font-semibold">
                <span class="text-lg lg:text-xl">You have read</span>
                <div class="text-6xl md:text-8xl lg:text-9xl font-extrabold">{parseFloat(readBooksPercentage).toFixed(2)}%</div>
                <div class="flex justify-end">
                    <span class="text-lg lg:text-xl font-semibold">of your books</span>
                </div>
            </div>
        </div>
    </div>
</div>
