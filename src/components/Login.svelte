<script>
    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<section>
  {#if user}
      <button on:click={ () => auth.signOut() }>Logout</button>
  {:else}
    <button on:click={login}>
      Signin
    </button>
  {/if}
</section>