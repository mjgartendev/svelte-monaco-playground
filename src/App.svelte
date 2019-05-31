<script>
  import * as monaco from 'monaco-editor';
  import {onMount} from 'svelte';
  import {generateApp} from './compileSource';

  $: theme = monaco.editor.setTheme(theme);
  let previewType;
  let value;
  let svelteSource = {};
  export let name = "SvelteMonaco Sandbox";
  export let user = "Stranger";
  function updatePreview(){
    value = monaco.editor.getModel('inmemory://model/1').getValue();
    generateApp().then(function(response) {
      svelteSource += response.json()
    });
  }
  onMount(() => updatePreview())
  </script>
  
<style>
 
.workbench {
  display: grid;
  grid-template-rows: 60px auto 40px;
  grid-template-columns: auto 1fr 1fr;
  grid-template-areas: "top top top" "nav input output" "nav btm btm";
  color: white;
  font-family: Roboto;
	height: 100vh;
	width: 100vw;
}
#code{grid-area: input}
#preview {
	all: initial;
	grid-area: output;
	background: white;
	color: black;
}
.navbar {
	grid-area: top;
  background: #1e1f26;
}
.navbar .btn {
  padding: 0.75em;
}
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
  <header class="navbar app-toolbar">
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
  </header>
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
      <p class="title">markup</p>
      <select bind:value={theme}>
          <option>vs-dark</option>
          <option>vs</option>
        </select>
    </header>
    <div class="panel-content">
      <div on:keydown={updatePreview} id="input" style="height: 600px; width: 800px;"></div> 
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
      <output id="output">{@html value}</output>
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
monaco.editor.create(document.getElementById('input'), {
	value: [
		'<script>\n\tlet name = "SvelteMonaco";\n<\/script>\n',
		'<style>\n\th1 {\n\t\tcolor: mediumseagreen\n\t}\n</style>\n',
    '\n<h1>Hello {name}!</h1>',
    'name: <input bind:value={name}>'
	].join('\n'),
	language: 'html'
});
  </script>
</svelte:head>