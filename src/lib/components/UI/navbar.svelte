<script>
    import logoImg from "../../images/logo.png";
    import HamburgerMenu from "../assets/hamburger-menu.svelte";
    let showMenu = false;
    function toggleMenu() {
        showMenu = !showMenu;
    }
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900 border-b-x border-gray-900/50 dark:border-gray-400/50">
    <div class="max-w-lg-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex gap-4">
            <img src="{logoImg}" alt="logo" class="w-10 h-10" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-red-300">
                Finn din neste bok
            </span>
        </a>
        
        <HamburgerMenu {toggleMenu}/>

        <div class="hidden w-full lg:block lg:w-auto" id="navbar-default">
            <ul class="flex flex-col md:flex-row md:justify-center dark:text-white text-lg font-bold">
                <li class="p-4">
                    <a href="/books" class="text-gray-900 hover:text-blue-700 
                    lg:p-0 
                    dark:text-white lg:dark:hover:text-red-300 
                    ">Bøker</a>
                </li>
                <li class="p-4">
                    <a href="/submitBooks" class="text-gray-900 hover:text-blue-700 
                    lg:p-0 
                    dark:text-white lg:dark:hover:text-red-300 
                    ">Legge inn bøker</a>
                </li>
                <li class="p-4">
                    <a href="/leseoversikt" class="text-gray-900 hover:text-blue-700 
                    lg:p-0 
                    dark:text-white lg:dark:hover:text-red-300 
                    ">Leseoversikt</a>
                </li>
                <li class="p-4">
                    <a href="/books" class="text-gray-900 hover:text-blue-700 
                    lg:p-0 
                    dark:text-white lg:dark:hover:text-red-300 
                    ">Logg inn</a>
                </li>
            </ul>
        </div>
        
    </div>
</nav>
{#if showMenu}
    <div class="lg:hidden bg-gray-900 border flex justify-center gap-10" id="navbar-default">
        <a href="/books" class="text-white hover:text-red-300">Bøker</a>
        <a href="/submitBooks" class="text-white hover:text-red-300">Legge inn Bøker</a>
        <a href="/leseoversikt" class="text-white hover:text-red-300">Leseoversikt</a>
    </div>
{/if}