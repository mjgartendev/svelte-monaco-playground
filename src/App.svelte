<script>
  import * as monaco from 'monaco-editor';
  import SplitPane from './components/SplitPane.svelte';
  import MonacoEditor from './components/MonacoEditor.svelte'
  import Navbar from './views/Navbar.svelte';
  import Sidebar from './views/Sidebar.svelte';
  import Footer from './views/Footer.svelte';

  $: theme = monaco.editor.setTheme(theme);
  $: value = `${html}\n<style>\n${css}\n</style>\n<script>\n${js}\n<\/script>`;
  let js = 'let name: string = "SvelteMonaco";\nfunction hello(name: string) {\n\tconsole.log(name);\n};';
  let html = '<h1>Hello {name}!</h1>\n<label>name</label>\n<input bind:value={name}>\n<button>Click me!</button>';
  let css = 'h1 {\n\tcolor: var(--primary);\n}\n:root {\n\t--primary: #29c785;\n\t--secondary: #444857;\n\t--surface: #2D303A;\n}';
  export let name = "SvelteMonaco Playground";
  let previewType;
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
  output {
    background: white;
  }
  pre{
    background: #333;
    padding: .25rem;
    border-radius: var(--radius);
    overflow: auto;
    height: 200px;
    font-size: 16px;
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
    <div class="panel-content" style="display: flex; flex-direction: column; width: 100%; height: 100%;">
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
        <option>rendered</option>
        <option>ast</option>
        <option>js</option>
        <option>css</option>
      </select>
    </header>
    <div class="panel-content">
      <SplitPane>
        <pre slot="a" id="raw" data-lang="text/html">{value}</pre>
        <output slot="b">{@html value}</output>
      </SplitPane>
    </div>
  </section>

  <Footer/>
</div>
<svelte:head>
  <script>
      monaco.editor.colorizeElement(document.getElementById('raw'));
  </script>
</svelte:head>

