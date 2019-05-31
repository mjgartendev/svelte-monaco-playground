<script>
  import * as monaco from 'monaco-editor';
  import {onMount} from 'svelte'
    export let w = 600;
    export let h = 500;
    export let editor;
    $: theme = monaco.editor.setTheme(theme);
    let value;
    function updatePreview(){
      console.log(monaco.editor.getModel('inmemory://model/1').getValue())
      value = monaco.editor.getModel('inmemory://model/1').getValue();
    }
    onMount(() => updatePreview())
  </script>
  
<style>
  :global(body){
    background: #f1f1f1;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  main{
    display: flex;
    background: #fff;
  }
</style>
<select bind:value={theme}>
  <option>vs-dark</option>
  <option>vs</option>
</select>
<main>
  <div on:keydown={updatePreview} id="input" style="height: 600px; width: 800px;"></div>
  <div id="output">{@html value}</div>
</main>

<svelte:head>
<script>  
  self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css') {
			return './css.worker.bundle.js';
		}
		if (label === 'html') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
}

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