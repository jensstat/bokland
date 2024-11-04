<script>
    import Hero from '$lib/components/UI/hero.svelte';
    export let data;

    // Destructure favoriteBooks from Data
    const { favoriteBooks, readBooksPercentage } = data;
</script>

<!-- Navbar rendered in layout.svelte-->
<!-- Hero Content -->
<Hero {favoriteBooks} {readBooksPercentage} />
<h1>Hello</h1>
<!-- Footer rendered in layout.svelte-->
