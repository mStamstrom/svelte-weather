import {writable, readable} from 'svelte/store';
import { getWeatherForecast } from '../util/Api';

const intialForecast = {
  cityName: '',
  list: [],
}
export const forecast = readable(intialForecast, set => {
    getWeatherForecast(2666218).then((res) => {
      set({
        cityName: res.city.name,
        list: res.list
      })
    });
});

export const selectedForecast = writable({});
forecast.subscribe(x => {
  if (x.list.length > 0) {
    selectedForecast.set(x.list[0]);
  } 
});
