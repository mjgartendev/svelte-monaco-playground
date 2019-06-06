<svelte:head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.32.5/jsoneditor.min.css" rel="stylesheet" type="text/css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsoneditor/5.32.5/jsoneditor.min.js"></script>
</svelte:head>
<script>
  import {onMount} from 'svelte'
  import * as JSONEditor from 'jsoneditor';
  export let options = {
    mode: 'code'
  };
  export let width = 500;
  export let height = 600;
  export let json = {
    "Array": [1, 2, 3],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": {"a": "b", "c": "d"},
    "String": "Hello World"
  };  
  const getValue = () => editor.get();
  const setValue = () => editor.set(json);
  onMount(()=>{
    let editor = new JSONEditor(document.getElementById('jsoneditor'), options);
    editor.set(json);
  })
</script>

<div id="jsoneditor" style="width: 100%; height: 100%;"></div>