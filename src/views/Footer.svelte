<footer>
  <div>
    <button>Console</button>
    <button>Assets</button>
    <button>Comments</button>
    <button>Shortcuts</button>
  </div>
  <div>
    <button>Delete</button>
    <button>Collections</button>
    <button>Embed</button>
    <button>Export</button>
    <button>Share</button>
  </div>
</footer>

<style>
  footer {
    grid-area: btm;
    height: 40px;
    display: flex;
    padding: 0 1em;
    justify-content: space-between;
    align-items: center;
    background: var(--surface);
    color: var(--primary);
  }

  button,
  select {
    padding: 0.5em;
    border: 1px solid var(--secondary);
    font-weight: bold;
    border-radius: var(--radius);
    background: var(--secondary);
    color: var(--light);
    fill: var(--light);
  }

  button:hover {
    fill: var(--primary);
    color: var(--primary);
    cursor: pointer;
  }
</style>