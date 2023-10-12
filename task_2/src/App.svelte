<script lang="ts">
import { onMount } from "svelte";

let code = [];
let firstItemCode = 'USD';
let secondItemCode = 'RUB';
let firstItemValue = 0;
let secondItemValue = 0;
let RATES = {};

onMount(async () => {
  fetch("https://open.er-api.com/v6/latest/USDs")
  .then(response => response.json())
  .then(data => {
    code = Object.keys(data.rates);
    RATES = data.rates;
  }).catch(error => {
    console.log(error);
    return [];
  });
});

function converter(codeItem, number) {
  console.log(codeItem, number)
  const URL = "https://open.er-api.com/v6/latest/" + codeItem + "s";
   fetch(URL)
  .then(response => response.json())
  .then(data => {
    const itemRATES = data.rates;
    console.log('rates', number*itemRATES[firstItemCode], itemRATES, number, codeItem)
    return (number*itemRATES[firstItemCode])
  }).catch(error => {
    console.log(error);
    return 0;
  });
  
};


</script>

<main>
  <h1>Конвертер валют</h1>

  <input type='number' bind:value={firstItemValue} on:input={() => console.log('New value:', firstItemValue, firstItemValue)}/>

  <select bind:value={firstItemCode}>
  	{#each code as item}
		  <option value={item}>{item}<option>
	  {/each}
  </select>


  <input type='number' bind:value={secondItemValue} on:input={() => console.log('New value:', converter(secondItemCode, secondItemValue))}/>

  <select bind:value={secondItemCode}>
  	{#each code as item}
		  <option value={item}>{item}<option>
	  {/each}
  </select>

</main>

<style>
</style>
