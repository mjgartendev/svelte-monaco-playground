<script>
  import * as svelte from 'svelte/compiler'
  export let type = 'raw';
  export let source;
  export let js;
  export let css;
  export let html;
  let ast = () => {
    return {ast} = compiled;
  }
  $: source = `${html}\n<style>\n${css}\n</style>\n<script>\n${js}\n<\/script>`;
  $: compiled = () => svelte.compile(source);
</script>

{#if type == "live"}
  {@html source}
{/if}
{#if type == "ast"}
  <pre>{compiled}</pre>
{/if}
{#if type == "raw"}
  <pre id="raw">{source}</pre>
{/if}

<style>
   pre{
     margin-top: -3px;
    background: #333;
    padding: .5rem;
    border-radius: var(--radius);
    overflow: auto;
    height: 100%;
    font-size: 16px;
  }
</style>
