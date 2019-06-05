<script>
  import * as svelte from 'svelte/compiler'
  import {onMount} from 'svelte'
  export let type = 'live';
  export let id;
  export let title;
  let options = {}
  export let html;
  export let js;
  export let css;
  let result;
  $: source = `${html}\n<style>\n${css}\n<\/style>\n<script>\n${js}\n<\/script>`;
  $: {
    try {
      result = svelte.compile(source, {
        name: id,
        generate: 'dom',
        hydratable: true,
        filename: `"${title}.svelte"`
      })
    }
    catch(error){
      console.log(error)
    }
    finally{
      console.log('compiled source', result)
      }
    }
</script>

{#if type == "live"}
{@html source}
{/if}
{#if type == "ast"}
  <pre id="ast" data-lang="json">{JSON.stringify(result.ast, null, 2)}</pre>
{/if}
{#if type == "css"}
  {#if result.css.code}
  <pre id="css" data-lang="css">{result.css.code}</pre>
  {:else}
  <p>No CSS output</p>
  {/if}
{/if}
{#if type == "js"}
{#if result.js.code}
  <pre id="js" data-lang="javascript">{result.js.code}</pre>
   {:else}
  <p>No JS output</p>
  {/if}
{/if}
{#if type == "original"}
  <pre id="raw" data-lang="html">{source}</pre>
{/if}
{#if type == "stats"}
  {#if result.stats}
  <pre id="stats" data-lang="json">{JSON.stringify(result.stats, null, 2)}</pre>
  {:else}
  <p>No Stats output</p>
  {/if}
{/if}
{#if type == "warnings"}
  {#if result.warnings}
  <pre id="warnings" data-lang="json">{JSON.stringify(result.warnings, null, 2)}</pre>
  {:else}
  <p>No Warnings output</p>
  {/if}
{/if}
{#if type == "vars"}
  {#if result.vars}
  <pre id="vars" data-lang="json">{JSON.stringify(result.vars, null, 2)}</pre>
  {:else}
  <p>No Variables output</p>
  {/if}
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
