<script>
    let checked = false;
    export let trueIcon = "check";
    export let falseIcon = "times";
  </script>
  
  <label>
    <input hidden type=checkbox bind:checked>
    {#if checked}
    <span class="fas fa-{trueIcon}"></span>
    {:else}
    <span class="fas fa-{falseIcon}"></span>
    {/if}
  </label>