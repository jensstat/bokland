<script>
    export let title;
    export let subtitle;
    export let percentageRead;
    export let percentageNotRead;
    export let booksRead;
    export let totalBooks;
    export let highlightcolor;
</script>

<div class="flex flex-col items-center text-lg lg:text-xl {highlightcolor} mb-6">
    <div class="text-lg lg:text-xl flex-row font-semibold">
        <span class="text-lg lg:text-xl">{title}</span>
        <div class="text-6xl md:text-8xl lg:text-9xl font-extrabold">{parseFloat(percentageRead).toFixed(2)}%</div>
        <div class="flex justify-end">
            <span class="text-lg lg:text-xl font-semibold">{subtitle}</span>
        </div>
    </div>
</div>

<div class="bg-gray-800 rounded-lg p-4 lg:p-6 text-white text-2xl lg:text-3xl text-center shadow-lg w-full max-w-lg mb-6">
    <p>That is <span class="font-bold {highlightcolor}">{booksRead}</span> out of <span class="font-bold {highlightcolor}">{totalBooks}</span> books!</p>
    <p class="text-gray-400 text-base md:text-lg mt-2">You still have <span class="{highlightcolor} font-bold">{totalBooks - booksRead}</span> more to read!</p>
</div>
