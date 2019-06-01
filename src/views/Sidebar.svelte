<aside class="app-drawer">
    <nav>
        {#each links as link}
          <a href={link.to}>
            <span class="fas fa-{link.icon}"></span>
            <p hidden>{link.name}</p>
          </a>
        {/each}
      </nav>
</aside>
<style>
  aside{
    grid-area: nav;
    display: flex;
    font-size: 1.5rem;
    background: var(--surface);
    color: var(--primary);
  }
  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    color: var(--primary);;
    align-self: stretch;
    padding: 1rem .5em;
    text-decoration: none;
    font-weight: bold;
  }
  a:hover {
    background: var(--primary);
    color: var(--white);
    fill: var(--white);
  }
</style>

<script>
  export let links;
</script>
