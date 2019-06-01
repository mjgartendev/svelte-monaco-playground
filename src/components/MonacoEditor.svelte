<p>{name}</p>
<div on:keydown on:input on:change id={name} style="height:100%;width:100%;"></div>

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
  export let language = 'typescript';
  export let initialValue = 'function hello(name: string) {\n\talert(`Hello ${name}!`);\n}';
  export let name;
  let editor;
  onMount(() => {  
    let editor = monaco.editor.create(document.getElementById(name),{
        value: [initialValue].join('/n'),
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
</script>