<script>
  import * as monaco from 'monaco-editor';
  import * as svelte from 'svelte/compiler'
  import {onMount} from 'svelte';
  import SplitPane from './components/SplitPane.svelte'
  import Login from './components/Login.svelte'
  import Navbar from './views/Navbar.svelte'

  let previewType;
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
  grid-template-areas: "top top top" "nav input output" "nav btm btm";
  color: white;
  font-family: Roboto;
	height: 100%;
  box-sizing: border-box;
}
#code{
  width: 100%;
  grid-area: input}
#preview {
  padding: 0;
  height: 100%;
	grid-area: output;
	background: white;
	color: black;
}
pre{background: #f1f1f1;}

.footer {
  grid-area: btm;
}
.app-panel {
  display: grid;
  grid-template-rows: auto 1fr;
  border: 1px solid #1e1f26;
	flex-direction: column;
	height: 100%;
	background: #1e1f26;
}
section.app-panel  > .panel-header {
	color: darkseagreen;
	height: 30px;
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
  color: mediumseagreen;
}
nav {
  display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
}
a.nav-item {
  color: inherit;
  align-self: stretch;
  padding: 1rem .5em;
  text-decoration: none;
  font-weight: bold;
}
a.nav-item:hover {
  background: mediumseagreen;
  color: #f1f1f1;
}

.app-toolbar {
  display: flex;
  padding: 0 1em;
  justify-content: space-between;
  align-items: center;
  background: #2d303a;
}
.btn, select {
	padding: 0.5em;
	border: 1px solid #1e1f26;
	font-weight: bold;
  border-radius: 3px;
  background: #444857;
  color: #ddd;
  fill: #ddd;
}
.btn:hover {
  fill: mediumseagreen;
  color: mediumseagreen;
  cursor: pointer;
}
</style>

<div class="workbench">
  <!-- <header class="navbar app-toolbar">
     <div class="left">      
        ⛱ | {name} | Hello, {user}!
      </div>
     <div class="right">
      <button class="btn"><span class="mdi mdi-heart-outline"></span></button>
        <button class="btn"><span class="mdi mdi-floppy"></span></button>
        <button class="btn"><span class="mdi mdi-source-branch"></span></button>
        <button class="btn"><span class="mdi mdi-wrench-outline"></span></button>
        <button class="btn"><span class="mdi mdi-view-quilt"></span></button>
        <button class="btn"><span class="mdi mdi-pin"></span></button>
        <button class="btn"><span class="mdi mdi-account-box-outline"></span></button>
     </div>
  </header> -->
  <Navbar class="navbar app-toolbar" title={"SvelteMonaco Playground"} links={[{name: "home", to: "."}]}>
    <Login></Login>
  </Navbar>
  <aside class="app-drawer">
    <nav>
      <a class="nav-item" href="#dashboard">
        <span class="mdi mdi-large mdi-home">
        <p hidden>Dash</p>
      </a>
      <a class="nav-item" href="#config">
        <span class="mdi mdi-tune">
        <p hidden>Config</p>
      </a>
      <a class="nav-item" href="#theme">
        <span class="mdi mdi-palette-outline">
        <p hidden>Theme</p>
      </a>
      <a class="nav-item" href="#data">
        <span class="mdi mdi-database">
        <p hidden>Data</p>
      </a>
      <a class="nav-item" href="#ui">
        <span class="mdi mdi-view-quilt">
        <p hidden>UI</p>
      </a>
      <a class="nav-item" href="/settings">
        <span class="mdi mdi-settings-outline"></span>
        <p hidden>Settings</p>
      </a>
    </nav>
  </aside>
  <section id="code"  class="app-panel">
    <header class="panel-header">
        <button class="btn"><span class="mdi mdi-36 mdi-pencil"></span></button>
        <p class="title">Svelte Component</p>
        <select bind:value={theme}>
            <option>vs-dark</option>
            <option>vs</option>
          </select>
    </header>
    <div class="panel-content" style="display: flex; flex-direction: column;">
      <span>Markup</span>
      <div on:keydown={updatePreview} id="markup" style="height: 100%; width: 100%;"></div>
      <span>Style</span>
      <div on:keydown={updatePreview} id="style" style="height: 100%; width: 100%;"></div> 
      <span>Script</span>
      <div on:keydown={updatePreview} id="script" style="height: 100%; width: 100%;"></div> 
   </div>
  </section>
  <section id="preview" class="app-panel">
    <header class="panel-header">
      <button class="btn"><span class="mdi mdi-36 mdi-pencil"></span></button>
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
  <footer class="footer app-toolbar">
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