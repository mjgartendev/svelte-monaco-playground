<script>
    import { auth, googleProvider } from '../firebase';
    import { authState } from 'rxfire/auth';

    let user;
    const unsubscribe = authState(auth).subscribe(u => {
      user = u
    });

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

  {#if user}
    <img on:click={ () => auth.signOut() } src={ user.photoURL } width="40" alt="user avatar">
  {:else}
    <button on:click={login}>
      Login
    </button>
  {/if}
  <style>
    img {
      border-radius: 50%;
      cursor: pointer;
      margin: 0 .25rem;
    }
    button {
      cursor: pointer;
      margin: 0 .25rem;
      font-weight: bold;
      border-radius: var(--radius, 4px);
      background: transparent;
      color: var(--primary, mediumseagreen);
      border: 1px solid currentColor;
      padding: .5rem 1rem;
    }
    button:hover {
      background: white;
    }
  </style>