<span>{name}</span>
<div on:keyup on:change on:input id={name} style="height:100%;width:100%;"></div>

<script>
  import {onMount} from 'svelte'
  export let theme = 'Oceanic Next';
  export let language = 'svelte';
  export let value;
  export let name;
  let editor;
  onMount(() => { 
    editor = monaco.editor.create(document.getElementById(name),{
      value: [value].join('/n'),
      language: language,
      theme: theme,
      fontSize: 16,
      fontWeight: '500',
      formatOnType: true,
      formatOnPaste: true,
      highlightActiveIndentGuide: true,
      lineNumbersMinChars: 2,
      showFoldingControls: "always",
      tabCompletion: "on"
    });
  });
</script>
<style>
  span{
    display: flex;
    background: var(--secondary);
    color: var(--light);
    align-items: center;
    justify-content: center;
    padding: .1rem;
  }
</style>
<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.17.0/min/vs/loader.js"></script>
  <script async src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.17.0/min/vs/editor/editor.main.nls.js"></script>
  <script>
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.17.0/min/vs' }});
    window.MonacoEnvironment = {
      getWorkerUrl: function(workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = {
            baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.17.0/min/'
          };
          importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.17.0/min/vs/base/worker/workerMain.js');`
        )}`;
      }
    };
</script>
</svelte:head>