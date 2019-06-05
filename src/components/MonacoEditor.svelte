<p>{name}</p>
<div on:keydown on:change on:input id={name} style="height:100%;width:100%;"></div>

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
</script>