<script>
  import * as monaco from 'monaco-editor';
  import SplitPane from './components/SplitPane.svelte';
  import MonacoEditor from './components/MonacoEditor.svelte'
  import ComponentPreview from './components/ComponentPreview.svelte'
  import Navbar from './views/Navbar.svelte';
  import Sidebar from './views/Sidebar.svelte';
  import Footer from './views/Footer.svelte';
  
  export let name = "SvelteMonaco Playground";
  export let previewType;

  $: theme = monaco.editor.setTheme(theme);
  let js = 'let name = "SvelteMonaco";\nfunction hello(name) {\n\tconsole.log(name);\n};';
  let html = '<h1>Hello {name}!</h1>\n<label>name</label>\n<input bind:value={name}>\n<button>Click me!</button>';
  let css = 'h1 {\n\tcolor: var(--primary);\n}\n:root {\n\t--primary: #29c785;\n\t--secondary: #444857;\n\t--surface: #2D303A;\n}';
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
  Navbar {grid-area: top}
  Sidebar{grid-area: nav}
  Footer{grid-area: btm}
  #code{
    width: 100%;
    grid-area: input
  }
  #preview {
    padding: 0;
    grid-area: output;
    background: white;
  }
  #code .panel-content {
    display: flex; flex-direction: column; width: 100%; height: 100%;
  }
  .app-panel {
    display: grid;
    grid-template-rows: auto 1fr;
    border: 1px solid var(--secondary);
    flex-direction: column;
    height: 100%;
    background: var(--surface);
  }
  section.app-panel  > .panel-header {
    height: 40px;
    color: var(--primary);
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
    align-items: center;
    font-weight: bold;
    background: var(--surface);
    margin: 0;
  }
  *, *::before, *::after {box-sizing: border-box}
</style>

<div class="workbench">
  <Navbar 
    title={name} 
    links={[
      {name: "home", to: "."},
      {name: "explore", to: "/explore"},
      {name: "profile", to: "/profile"}
    ]}
  />
  <Sidebar 
    links={[
      {name: "dashboard", to: "/dashboard", icon: "home"},
      {name: "settings", to: "/settings", icon: "cog"},
      {name: "theme", to: "/theme", icon: "paint-brush"},
      {name: "resources", to: "/resources", icon: "compass"},
      {name: "components", to: "/components", icon: "cubes"},
      {name: "projects", to: "/projects", icon: "box-open"}
    ]}
  />

  <section id="code"  class="app-panel">
    <header class="panel-header">
        <button class="btn"><span class="fas fa-edit"></span></button>
        <p class="title">Svelte Component</p>
        <select bind:value={theme}>
            <option>vs-dark</option>
            <option>vs</option>
          </select>
    </header>
    <div class="panel-content">
      <MonacoEditor 
        name={"markup"}
        language={"html"}
        initialValue={html}        
        on:keydown={(e)=> html = e.target.value}
      />
      <MonacoEditor 
        name={"style"}
        language={"css"}
        initialValue={css}    
        on:keydown={(e)=> css = e.target.value}
      />
      <MonacoEditor 
        name={'script'}    
        language={"javascript"}        
        initialValue={js}        
        on:keydown={(e)=> js = e.target.value}
      />
   </div>
  </section>
  <section id="preview" class="app-panel">
    <header class="panel-header">
      <button><span class="fas fa-edit"></span></button>
      <p class="title">Preview</p>
      <select bind:value={previewType}>
        <option>raw</option>
        <option>live</option>
        <option>ast</option>
      </select>
    </header>
    <div class="panel-content">
      <ComponentPreview html={html} css={css} js={js} type={previewType}/>
    </div>
  </section>

  <Footer/>
</div>


