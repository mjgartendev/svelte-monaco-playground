<script>
  import * as svelte from 'svelte/compiler'
  import {onMount} from 'svelte'
  import * as monaco from 'monaco-editor'
  export let type = 'live';
  export let js;
  export let css;
  export let html;
  export let id;
  export let title;
  let options = {}
  $: source = `${html}\n<style>\n${css}\n<\/style>\n<script>\n${js}\n<\/script>`;
  $: result = svelte.compile(source, {
    name: id,
    generate: 'dom',
    hydratable: true,
    filename: `"${title}.svelte"`
  });
</script>


{#if type == "live"}
  {@html source}
{/if}
{#if type == "ast"}
  <pre id="ast" data-lang="json">{JSON.stringify(result.ast, null, 2)}</pre>
{/if}
{#if type == "css"}
  <pre id="css" data-lang="css">{result.css.code}</pre>
{/if}
{#if type == "js"}
  <pre id="js" data-lang="javascript">{result.js.code}</pre>
{/if}
{#if type == "original"}
  <pre id="raw" data-lang="html">{source}</pre>
{/if}

<style>
   pre{
     margin-top: -3px;
     margin: 0 auto;
    background: #f1f1f1;
    color: #333;
    padding: .5rem;
    border-radius: var(--radius);
    overflow: scroll;
    max-width: 600px;
    max-height: 700px;
    font-size: 16px;
  }
</style>
