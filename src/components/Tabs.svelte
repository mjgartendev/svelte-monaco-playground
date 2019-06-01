<script>
    export let tabs =[{name: "tab 1", content: "sample content"}];
    export let current = tabs[0];
  </script>
  
  <style>
    .tabs {
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
    }
    button{
      margin: 0;
      padding: .5rem 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  
    .active {
      background-color: mediumseagreen;
      color: white;
    }
    .activePanel{
      display: block;
    }	
    .panels{
      border: 1px solid #f1f1f1;
      border-top: 0;
      padding: 1rem;
    }
  </style>
  <div class="tabs">
    {#each tabs as tab, i}
    <button
      class:active="{current === tabs[i]}"
      on:click="{() => current = tabs[i]}"
    >{tab.name}</button>
    {/each}
  </div>
  <div class="panels">
    {#each tabs as tab, i}
    <div hidden class:activePanel="{current === tabs[i]}">
      {tab.content}
    </div>
    {/each}
  </div>
  