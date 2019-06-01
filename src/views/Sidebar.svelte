<aside class="app-drawer">
  <nav>
    <a href="#dashboard">
      <span class="fas fa-home"></span>
      <p hidden>Dash</p>
    </a>
    <a href="#settings">
      <span class="fas fa-cog"></span>
      <p hidden>Config</p>
    </a>
    <a href="#theme">
      <span class="fas fa-paint-brush"></span>
      <p hidden>Theme</p>
    </a>
    <a href="#resources">
      <span class="fas fa-compass"></span>
      <p hidden>Data</p>
    </a>
    <a href="#components">
      <span class="fas fa-cubes"></span>
      <p hidden>UI</p>
    </a>
    <a href="#projects">
      <span class="fas fa-box-open"></span>
      <p hidden>Settings</p>
    </a>
  </nav>
</aside>
<style>
  aside{
    grid-area: nav;
    display: flex;
    font-size: 1.5rem;
    background: #2d303a;
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
