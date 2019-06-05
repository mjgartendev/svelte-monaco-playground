<script>
  import * as monaco from 'monaco-editor';
  import {onMount} from 'svelte'
  import {db} from './firebase.js'
  import MonacoEditor from './components/MonacoEditor.svelte'
  import ComponentPreview from './components/ComponentPreview.svelte'
  import Navbar from './views/Navbar.svelte';
  import Sidebar from './views/Sidebar.svelte';
  import Footer from './views/Footer.svelte';
  
  export let path = window.location.pathname;
  export let name = "SvelteMonaco Playground";
  export let previewType;
  let snippets = [{id: 'NewSnippet', title: 'NewSnippet', html: "<h1>hello {name}</h1>\n<button>Button</button>", css: "button {\n\tbackground: var(--primary)\n}", js: "function x(name) {\n\tconsole.log()\t}"},]
  let selectedSnippet = snippets[0];
  $: source = {
    js: selectSnippet.js,
    css: selectedSnippet.css,
    html: selectedSnippet.html,
  }
  function updateModel(){
      monaco.editor.getModel("inmemory://model/3").setValue(app.$$.ctx.source.html);
      monaco.editor.getModel("inmemory://model/2").setValue(app.$$.ctx.source.css);
      monaco.editor.getModel("inmemory://model/1").setValue(app.$$.ctx.source.js);
    }
  export let theme = 'vs-dark';
  function addSnippet() {
    db.collection("snippets").add({
      title: selectedSnippet.title,
      html: selectedSnippet.html,
      css: selectedSnippet.css,
      js: selectedSnippet.js,
    })
    .then(function(docRef) {
       snippets = [...snippets, docRef];
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  function removeSnippet(snippet){
    console.log("removing snippet", snippet)
  }
  function getSnippets() {
    db.collection("snippets").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          snippets = [
            ...snippets, 
            {...doc.data(), id: doc.id}
          ];
      });
    });
    console.log([snippets])
  }
  function selectSnippet(snippet){
    selectedSnippet = snippet;
    updateModel();
  }
  onMount(() => {
    getSnippets();
  })
</script>

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
    {path}
    links={[
      {name: "dashboard", to: "", icon: "home"},
      {name: "settings", to: "/settings", icon: "cog"},
      {name: "theme", to: "/theme", icon: "paint-brush"},
      {name: "resources", to: "/resources", icon: "compass"},
      {name: "components", to: "/components", icon: "cubes"},
      {name: "projects", to: "/projects", icon: "box-open"}
    ]}
  />
  <section id="list" class="app-panel">
    <header class="panel-header">
       <button on:click={addSnippet} class="btn"><span class="fas fa-plus"></span></button>
        <p class="title">Snippets</p>
    </header>
    <div class="panel-content">
    <ul style="overflow: auto">
        {#each snippets as snippet}
          <li id={snippet.id} on:click={() => selectSnippet({...snippet})}>{snippet.title} <span class="fas fa-times" on:click={() => removeSnippet({...snippet})}></span></li>
        {/each}
    </ul>
    </div>
  </section>

  <section id="code"  class="app-panel">
    <header class="panel-header">
        <button class="btn"><span class="fas fa-edit"></span></button>
        <input bind:value={selectedSnippet.title} class="title"/>
        <select bind:value={theme}>
            <option>vs-dark</option>
            <option>vs</option>
        </select>
    </header>
    <div class="panel-content">
      <MonacoEditor 
        name="markup"
        language="html"
        value={source.html}
         on:keydown={(e) => source.html = e.target.value}
      />
      <MonacoEditor 
        name="style"
        language="css"
        value={source.css}
         on:keydown={(e) => source.css = e.target.value}
      />
      <MonacoEditor 
        name="script"  
        language="typescript"      
        value={source.js}
        on:keydown={(e) => source.js = e.target.value}
      />
   </div>
  </section>

  <section id="preview" class="app-panel">
    <header class="panel-header">
      <button><span class="fas fa-edit"></span></button>
      <p class="title">Previewing {selectedSnippet.title}</p>
      <select bind:value={previewType}>
        <option>ast</option>
        <option>live</option>
        <option>original</option>
        <option>css</option>
        <option>js</option>
      </select>
    </header>
    <div class="panel-content">
      <ComponentPreview
        id={selectedSnippet.id}
        title={selectedSnippet.title}
        html={source.html}
        css={source.css}
        js={source.js} 
        type={previewType}
      />
    </div>
  </section>

  <Footer/>
</div>
  
<style>
    .workbench {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto auto 1fr 1fr;
      grid-template-areas: "top top top top" "nav list input output" "btm btm btm btm";
      color: white;
      height: 100%;
      box-sizing: border-box;
    }
    Navbar {grid-area: top}
    Sidebar{grid-area: nav}
    Footer{grid-area: btm}
    #list{grid-area: list; overflow: auto;}
    #code{
      width: 100%;
      grid-area: input
    }
    input {
      background: #f1f1f1;
      border: 1px solid var(--surface);
      padding: .25rem .5rem;
      outline: none;
      border-radius: var(--radius);
    }
    ul{
      margin: 0;
      padding: .25rem;
    }
    li{
      border: 1px solid transparent;
      border-radius: var(--radius);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      padding: 1rem;
      border: 1px solid var(--secondary);
      list-style: none;
      cursor: pointer;
    }
    li:hover {
      border-color: var(--primary);
    }
    li > span {
      padding: .25rem;
    }
    li > span:hover{
      color: tomato;
    }
    #preview {
      padding: 0;
      grid-area: output;
      background: var(--white, white);
      color: var(--dark, #333);
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
