<script>
  import * as monaco from 'monaco-editor';
  import {onMount} from 'svelte'
  import {db} from './firebase.js'
  import MonacoEditor from './components/MonacoEditor.svelte';
  import ComponentPreview from './components/ComponentPreview.svelte';
  import ReplMonaco from './components/ReplMonaco.svelte';
  import Navbar from './views/Navbar.svelte';
  import Footer from './views/Footer.svelte';
  import {themes} from './monaco-themes.js';
  export let path = window.location.pathname;
  let type = 'example';
  let previewType = 'live';
  let previewTypes = ['live', 'ast', 'html', 'js', 'css', 'vars', 'stats']
  let snippets = [{
    id: 'NewSnippet', 
    title: 'NewSnippet', 
    html: "<h1>hello {fullName}</h1>\n<label>First: <input bind:value={firstName} /></label>\n<label>Last: <input bind:value={lastName} /></label>\n<button on:click={logName}>Log Name</button>", 
    css: "button {\n\tbackground: var(--primary);\n\tcolor: var(--secondary);\n\tborder: 1px solid currentColor;\n}\nh1 {\n\tcolor: tomato;\n}\nlabel \n{\n\tmargin-bottom: 1rem;\n\tfont-weight: bold;\n}", 
    js: "function logName() {\n\tconsole.log(fullName)\n}\nexport let firstName = '';\nexport let lastName = '';\n$: fullName = firstName + ' ' + lastName;"},]
  let selectedSnippet = snippets[0];
  $: source = {
    title: selectedSnippet.title,
    js: selectedSnippet.js,
    css: selectedSnippet.css,
    html: selectedSnippet.html,
  }
  $: updateModel = () => {
      if(type === 'example'){
        monaco.editor
          .getModel("inmemory://model/1")
          .setValue(`${source.html}\n\n<style type="text/scss">\n  ${source.css}\n</style>\n\n<script type="text/typescript">\n${source.js}\n<\/script>\n`);
    }else {
      monaco.editor.getModel("inmemory://model/1").setValue(source.html);
      monaco.editor.getModel("inmemory://model/2").setValue(source.css);
      monaco.editor.getModel("inmemory://model/3").setValue(source.js);
    }
  }
  let theme = {id: 'oceanic-next', name: 'Oceanic Next'};
  $: {
      if(theme == 'vs' || theme == 'vs-dark'){
         monaco.editor.setTheme(theme);
      }else {
       fetch(`/themes/${encodeURIComponent(theme.name)}.json`)
        .then(data => data.json())
        .then(data => {
          monaco.editor.defineTheme(theme.id, data);
          monaco.editor.setTheme(theme.id);
        })
      }
    }
  function addSnippet() {
    db.collection("snippets").add({
      title: selectedSnippet.title,
      html: selectedSnippet.html,
      css: selectedSnippet.css,
      js: selectedSnippet.js,
    })
    .then(function(docRef) {
       snippets = [
         ...snippets, 
        {...docRef.data(), id: docRef.id}
       ];
       updateModel();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  function updateSnippet(){
    db.collection("snippets").doc(selectedSnippet.id).set({
      title: selectedSnippet.title,
      html: source.html,
      css: source.css,
      js: source.js
    })
     .then(function(docRef) {
       snippets = [
         ...snippets, 
        {...docRef.data(), id: docRef.id}
       ];
       updateModel();
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
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
    // TODO: fix this. assigning these values should not be required
    source.html = selectedSnippet.html;
    source.css = selectedSnippet.css;
    source.js = selectedSnippet.js;
    updateModel();
  }
  onMount(() => {
    getSnippets();
  })
</script>

<div class="workbench">
  <Navbar 
    links={[
      {name: "home", to: "."},
      {name: "explore", to: "/explore"},
      {name: "profile", to: "/profile"}
    ]}
  />
  
  <section id="list" class="app-panel">
    <header class="panel-header">
      <button on:click={addSnippet} class="btn">
        <span class="fas fa-plus"></span>
      </button>
    </header>
    <div class="panel-content">
    <ul style="overflow: auto">
        {#each snippets as snippet (snippet.id)}
          <li id={snippet.id} on:click={() => selectSnippet({...snippet})}>
            {snippet.title} 
            <span class="fas fa-times" on:click={() => removeSnippet({...snippet})}></span>
          </li>
        {/each}
    </ul>
    </div>
  </section>

  <section id="code"  class="app-panel">
    <header class="panel-header">
        <button class="btn" on:click={updateSnippet}><span class="fas fa-save"></span></button>
        <input bind:value={selectedSnippet.title} class="title"/>
        <select bind:value={theme}>
          {#each themes as theme}
            <option value={theme}>{theme.name}</option>
          {/each}
            <option>vs-dark</option>
            <option>vs</option>
        </select>
    </header>
    <div class="panel-content repl-outer">
      {#if type === 'repl'}
      <MonacoEditor 
        name="markup"
        language="handlebars"
        value={source.html}
         on:keyup={(e) => selectedSnippet.html = e.target.value}
      />
      <MonacoEditor 
        name="style"
        language="css"
        value={source.css}
         on:keyup={(e) => selectedSnippet.css = e.target.value}
      />
      <MonacoEditor 
        name="script"  
        language="typescript"      
        value={source.js}
        on:keyup={(e) => selectedSnippet.js = e.target.value}
      />
    {:else}
      <ReplMonaco />
    {/if}

   </div>
  </section>

  {#if type === 'repl'}
  <section id="preview" class="app-panel">
    <header class="panel-header">
      <button><span class="fas fa-edit"></span></button>
      <p class="title">Previewing {selectedSnippet.title}</p>
      <select bind:value={previewType}>
        {#each previewTypes as p}
          <option>{p}</option>
        {/each}
      </select>
    </header>
    <div class="panel-content">
      <ComponentPreview
        id={selectedSnippet.id}
        title={source.title}
        html={source.html}
        css={source.css}
        js={source.js}
        type={previewType}
      />
    </div>
  </section>
  {/if}

  <!-- <Footer/> -->
</div>
  
<style>
    .workbench {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto  1fr auto;
      grid-template-areas:  "top top top" "list input output" "btm btm btm";
      color: white;
      height: 100%;
      box-sizing: border-box;
    }
    Navbar {grid-area: top}
    Footer{grid-area: btm}
    #list{
      grid-area: list;
      overflow: hidden;
      height: 100%; width: 100%;
    }
    #code{
      width: 100%;
      grid-area: input
    }
    input {
      background: #ddd;
      color: var(--secondary);
      font-weight: bold;
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
      border-color: tomato;
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
      height: 30px;
      color: var(--primary);
      display: flex;
      justify-content: flex-start;
      padding: 0.5em;
      align-items: center;
      font-weight: bold;
      background: var(--surface);
      margin: 0;
    }
    	
    *, *::before, *::after {box-sizing: border-box}
</style>
