<script>
  import * as svelte from 'svelte/compiler'
  import {onMount} from 'svelte'
  export let type = 'ast';
  export let source;
  export let js;
  export let css;
  export let html;
  let options = {}
  $: source = `${html}\n<style>\n${css}\n</style>\n<script>\n${js}\n<\/script>`;
  $: result = svelte.compile(source);
  $: compiled = `${html}\n<style>\n${result.css.code}\n</style>\n<script>\n${result.js.code}\n<\/script>`  
</script>

{#if type == "live"}
  {@html compiled}
{/if}
{#if type == "ast"}
  <pre id="ast">{JSON.stringify(result.ast, null, 2)}</pre>
{/if}
{#if type == "css"}
  <pre>{JSON.stringify(result.css.code, null, 2)}</pre>
{/if}
{#if type == "js"}
  <pre>{JSON.stringify(result.js.code, null, 2)}</pre>
{/if}
{#if type == "original"}
  <pre id="raw">{source}</pre>
{/if}

<style>
   pre{
     margin-top: -3px;
     margin: 0 auto;
    background: #333;
    padding: .5rem;
    border-radius: var(--radius);
    overflow: scroll;
    max-width: 600px;
    max-height: 600px;
    font-size: 16px;
  }
</style>

<svelte:head>
  <script>
    monaco.editor.colorize(document.getElementById('ast'));
  </script>
</svelte:head>
