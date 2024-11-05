<script>
    import { isEditing } from '../../stores/editMode';
    import { onMount } from 'svelte';

    let username = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin(event) {
        event.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Login successful, token:', result.token); // Debugging line
            localStorage.setItem('token', result.token);
            isEditing.set(true); // Enable edit mode for logged-in user
        } else {
            errorMessage = result.error || 'Login failed';
        }
    }

    function logout() {
        localStorage.removeItem('token');
        isEditing.set(false); // Disable edit mode on logout
    }

</script>
{#if $isEditing}
    <button on:click={logout} class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
        Log out
    </button>
{:else}
    <form on:submit={handleLogin} class="flex items-center gap-2 p-1 bg-gray-100 rounded border border-gray-300">
        <input
            type="text"
            bind:value={username}
            placeholder="Username"
            required
            class="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
            type="password"
            bind:value={password}
            placeholder="Password"
            required
            class="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
            type="submit"
            class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
            Log in
        </button>
        {#if errorMessage}
            <p class="text-sm text-red-500 ml-2">{errorMessage}</p>
        {/if}
    </form>
{/if}
