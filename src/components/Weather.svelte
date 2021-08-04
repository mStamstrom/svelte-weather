<script>
  import { getWeatherForecast } from '../util/Api';
  import {selectedForecast, forecast} from '../store/WeatherStore'
  import WeatherSlider from './WeatherSlider.svelte';

  let backgroundImageClass = 'city-handler--sun';

  selectedForecast.subscribe(forecast => {
    const date = new Date(forecast.dt*1000);
    if (19 < date.getHours() || date.getHours() < 6) {
      backgroundImageClass = 'city-handler--night';
    } else if (forecast.weather && forecast.weather.length > 0) {
      if (forecast.weather[0].main === 'Sun') {
        backgroundImageClass = 'city-handler--sun';
      } else if (forecast.weather[0].main === 'Clear') {
        backgroundImageClass = 'city-handler--sun';
      } else if (forecast.weather[0].main === 'Rain') {
        backgroundImageClass = 'city-handler--rain';
      } else if (forecast.weather[0].main === 'Snow') {
        backgroundImageClass = 'city-handler--snow';
      } else if (forecast.weather[0].main === 'Clouds') {
        backgroundImageClass = 'city-handler--clouds';
      } else {
        backgroundImageClass = 'city-handler--clouds';
      }
    }
  })
</script>

<section class="{backgroundImageClass}">
  <h1 class="header-title">{ $forecast.cityName }</h1>
  <div class="selected-weather">
    {#if $selectedForecast.main}
      <div>
        { Math.round($selectedForecast.main.temp) }°
      </div>
    {:else }
      <span class="loading">
        loading...
      </span>
    {/if}
  </div>
  <WeatherSlider />
</section>

<style>
section {
  display: grid;
  grid-template-rows: 15% 70% 15%;
  grid-template-columns: 5% 90% 5%;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center;
  color: white;
  text-align: center;
}

.loading {
  font-size: 10vh;
}

.selected-weather {
  font-size: 40vh;
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 2;
}
.header-title {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row: 1;
}

</style>

