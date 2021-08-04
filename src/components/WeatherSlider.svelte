<script>
  import {formatTime, getDayFromDateString} from '../util/DateHelper';
  import { forecast, selectedForecast } from '../store/WeatherStore';

  let forecastsByDay = [];

  forecast.subscribe(forecasts => {
    const sortedWeather = [];
      for(const weather of forecasts.list) {
        const dateString = weather.dt_txt.split(' ')[0];

        const dayObject = sortedWeather.find(x => x.dateString === dateString);

        const weatherWithTime = weather;
        weatherWithTime.time = formatTime(weather.dt);
        if (dayObject) {
          dayObject.list.push(weather);
        } else {
          const day = getDayFromDateString(weather.dt);
          sortedWeather.push({ day, dateString, list: [weather]});
        }
      }
      forecastsByDay = sortedWeather;
  });

</script>


<section>
  {#each forecastsByDay as forecastDay}
    <div>
      <span>{forecastDay.day}</span>
      <div class="forecast-list">
        {#each forecastDay.list as forecast}
          <button class="forecast-button" on:click="{() => selectedForecast.set(forecast)}">
            <span>
              { forecast.time }
            </span>
            <span>
              { Math.round(forecast.main.temp) }°
            </span>
          </button>
        {/each}
      </div>
    </div>
  {/each}
  
</section>  

<style>
  section {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row: 3;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
  }
  .forecast-button {
    display: flex;
    flex-direction: column;
    color: white;
    background-color: transparent
  }

  .forecast-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-right: 30px;
  }

</style>