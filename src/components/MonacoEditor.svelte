<p>{name}</p>
<div on:keydown on:keydown={(e) => value = e.target.value} on:change on:input id={name} style="height:100%;width:100%;"></div>
<!-- <svelte:head>
  <script>
    
  </script>
</svelte:head> -->
<style>
  div {
    height: 100%;
    width: 100%;
    font-family: var(--font-family-monospace);
  }
  p{
    padding: .1rem;
    margin: 0;
    background: var(--surface);
    color: var(--light);
  }
</style>
<script>
  import * as monaco from 'monaco-editor';
  import {onMount} from 'svelte'
  export let h = "100%";
  export let w = "100%";
  export let theme = 'vs-dark';
  export let language = 'javascript';
  export let value;
  export let name;
  let editor;
  onMount(() => { 
    import * as monaco from 'monaco-editor';

    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, language) {
        if (language === 'json') {
          return './json.worker.js';
        }
        if (language === 'css') {
          return './css.worker.js';
        }
        if (language === 'html') {
          return './html.worker.js';
        }
        if (language === 'typescript' || language === 'javascript') {
          return 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.17.0/min/vs/basic-languages/typescript/typescript.js';
        }
        return './editor.worker.js';
      },
    };
    
    monaco.editor.create(document.getElementById(name),{
      value: [value].join('/n'),
      language: language,
      theme: theme,
      dragAndDrop: true,
      fontSize: 17,
      fontWeight: '500',
      formatOnType: true,
      formatOnPaste: true,
      highlightActiveIndentGuide: true,
      lineNumbersMinChars: 2,
      showFoldingControls: "always",
      tabCompletion: "on"
    });
  });
  $: if(editor) {
    monaco.editor.setTheme(theme)
  };
  $: if(editor) {
    monaco.editor.setModelLanguage(language)
  };
  $: if(editor) {
    monaco.editor.getModel().setValue(value)
  }
</script>