<script>
    import "../app.css";
    import Nav from '$lib/components/UI/navbar.svelte'; // Adjust the import path if necessary
    import Footer from '$lib/components/UI/footer.svelte';
  </script>
  
  <div class="flex flex-col min-h-screen">
    <!-- Global Navbar -->
    <Nav />
  
    <!-- Main content (pages) -->
    <slot />

    <Footer />
  </div>