<script>
    import BookList from '../../lib/components/BOOK-VIEW/bookList.svelte';
    export let data;
</script>
<!-- Navbar rendered in layout.svelte-->
<BookList {data} />