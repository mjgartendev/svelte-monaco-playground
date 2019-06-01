<script>
  import * as monaco from 'monaco-editor';
  import * as svelte from 'svelte/compiler'
  import {onMount} from 'svelte';
  import SplitPane from './components/SplitPane.svelte'
  import Login from './components/Login.svelte'
  import Navbar from './views/Navbar.svelte'

  let previewType;
  let codeW;
  $: theme = monaco.editor.setTheme(theme);
  $: value = (`${svelteSource.html}\n<style>\n${svelteSource.css}\n</style>\n<script>\n${svelteSource.js}\n<\/script>
  `);
  let svelteSource = {
    html: '',
    css: '',
    js: '',
  };
  export let name = "SvelteMonaco Sandbox";
  export let user = "Stranger";
  $: result = console.log(svelte.compile(value));
  function updatePreview(){
    svelteSource.html = monaco.editor.getModel('inmemory://model/1').getValue();
    svelteSource. css = monaco.editor.getModel('inmemory://model/2').getValue();
    svelteSource.js = monaco.editor.getModel('inmemory://model/3').getValue();
  }
  onMount(() => {
    updatePreview();
    compileComponent();
  })
  </script>
  
<style>
.workbench {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr 1fr;
  grid-template-areas: "nav top top" "nav input output" "nav btm btm";
  color: white;
  font-family: Roboto;
	height: 100%;
  box-sizing: border-box;
}
#code{
  width: 100%;
  grid-area: input
}
#preview {
	grid-area: output;
	background: white;
	color: black;
}
pre{background: #f1f1f1;}

footer {
  grid-area: btm;
}
.app-panel {
  display: grid;
  grid-template-rows: auto 1fr;
  border: 1px solid var(--secondary);
	flex-direction: column;
	height: 100%;
	background: var(--secondary);
}
section.app-panel  > .panel-header {
  height: 40px;
	color: var(--primary);
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
	align-items: center;
	font-weight: bold;
  background: #444857;
}
aside.app-drawer {
	grid-area: nav;
  display: flex;
  font-size: 2rem;
  background: #2d303a;
  color: var(--primary);
}
aside nav {
  display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
}
aside a.nav-item {
  color: var(--primary);;
  align-self: stretch;
  padding: 1rem .5em;
  text-decoration: none;
  font-weight: bold;
}
aside a.nav-item:hover {
  background: var(--primary);
  color: var(--white);
  fill: var(--white);
}

footer, Navbar {
  height: 40px;
  display: flex;
  padding: 0 1em;
  justify-content: space-between;
  align-items: center;
  background: var(--secondary);
}
.btn, select {
	padding: 0.5em;
	border: 1px solid var(--secondary);
	font-weight: bold;
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--light);
  fill: var(--light);
}
.btn:hover {
  fill: var(--primary);
  color: var(--primary);
  cursor: pointer;
}
*, *::before, *::after {box-sizing: border-box}
</style>

<div class="workbench">
  <Navbar title={name} links={[
    {name: "home", to: "."},
    {name: "profile", to: "/profile"}
  ]}>
    <Login></Login>
  </Navbar>
  <aside class="app-drawer">
    <nav>
      <a class="nav-item" href="/dashboard">
        <span class="fas fa-home"></span>
        <p hidden>Dash</p>
      </a>
      <a class="nav-item" href="/settings">
        <span class="fas fa-cog"></span>
        <p hidden>Config</p>
      </a>
      <a class="nav-item" href="/theme">
        <span class="fas fa-paint-brush"></span>
        <p hidden>Theme</p>
      </a>
      <a class="nav-item" href="/resources">
        <span class="fas fa-compass"></span>
        <p hidden>Data</p>
      </a>
      <a class="nav-item" href="/components">
        <span class="fas fa-cubes"></span>
        <p hidden>UI</p>
      </a>
      <a class="nav-item" href="/projects">
        <span class="fas fa-box-open"></span>
        <p hidden>Settings</p>
      </a>
    </nav>
  </aside>

  <section id="code"  class="app-panel">
    <header class="panel-header">
        <button class="btn"><span class="fas fa-edit"></span></button>
        <p class="title">Svelte Component</p>
        <select bind:value={theme}>
            <option>vs-dark</option>
            <option>vs</option>
          </select>
    </header>
    <div class="panel-content" bind:clientWidth={codeW} style="display: flex; flex-direction: column;">
      <span>Markup</span>
      <div on:keydown={updatePreview} id="markup" style="height: 100%; width: {codeW};"></div>
      <span>Style</span>
      <div on:keydown={updatePreview} id="style" style="height: 100%; width: {codeW};"></div> 
      <span>Script</span>
      <div on:keydown={updatePreview} id="script" style="height: 100%; width: {codeW};"></div> 
   </div>
  </section>
  <section id="preview" class="app-panel">
    <header class="panel-header">
      <button class="btn"><span class="fas fa-edit"></span></button>
      <p class="title">Preview</p>
      <select bind:value={previewType}>
        <option>rendered</option>
        <option>ast</option>
        <option>js</option>
        <option>css</option>
      </select>
    </header>
    <div class="panel-content">
      <SplitPane>
          <output slot="b" id="output">{@html value}</output>
          <pre slot="a" id="output">{value}</pre>
      </SplitPane>
      
    </div>
  </section>
  <footer>
     <div class="left">
        <button class="btn">Console</button>
        <button class="btn">Assets</button>
        <button class="btn">Comments</button>
        <button class="btn">Shortcuts</button>
     </div>
     <div class="right">
        <button class="btn">Delete</button>
        <button class="btn">Collections</button>
        <button class="btn">Embed</button>
        <button class="btn">Export</button>
        <button class="btn">Share</button>
     </div>
  </footer>
</div>


<svelte:head>
  <script>  
    monaco.editor.create(document.getElementById('markup'), {
      value: [
        '<h1>Hello {name}!</h1>',
        'name: <input bind:value={name}>'
      ].join('\n'),
      language: 'html'
    });
    monaco.editor.create(document.getElementById('style'), {
      value: [
        'h1 {\n  color: mediumseagreen\n}\n',
      ].join('\n'),
      language: 'css'
    });
    monaco.editor.create(document.getElementById('script'), {
      value: [
        '  let name = "SvelteMonaco";',
      ].join('\n'),
      language: 'javascript'
    });
  </script>
</svelte:head>