<script>
  import { city as cityStore, cityHistory } from '../store/WeatherStore';

  let isOpen = false;
  let city = '';
  function changeCity() {
    cityStore.set(city);
  }
</script>

{#if !isOpen}
  <section>
    <button on:click={() => isOpen = true }>Select city</button>
  </section>
{:else }
  <section class="menu">
    <button on:click={() =>isOpen = false}>Close</button>
    <form>
      <label>Enter city: </label>
      <input bind:value={city}/>
      <button type="button" on:click={changeCity}></button>
    </form>
    <div>
    <label>History</label>
      {#each $cityHistory as x}
        {x}
      {/each}
    </div>
  </section>
{/if}

<style>
  section {
    position: absolute;
  }
  button {
    margin: 10px;
    color: white;
  }
  .menu {
    height: 100%;
    background-color: lightgray;
    border-left: 1px solid grey;
  }
</style>