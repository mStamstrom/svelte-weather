import {writable, readable} from 'svelte/store';
import { getWeatherForecastByName } from '../util/Api';
import * as localStore from '../util/Store';

const intialForecast = {
  cityName: '',
  list: [],
}
export const city = writable('');

export const forecast = readable(intialForecast, set => {
  if (localStore.getCities() && localStore.getCities().length > 0) {
    setForecast(set, localStore.getCities()[0]);
  }
  city.subscribe(c => {
    if (c) {
      setForecast(set, c)
    }
  })
});

function setForecast(set, c) {
  getWeatherForecastByName(c).then((res) => {
    set({
      cityName: c,
      list: res.list
    })
  });
}
const historyList = [];
export const cityHistory = readable([], set => {
  set(localStore.getCities());
  forecast.subscribe(s => {
    if (s.cityName) {
      historyList.unshift(s.cityName);
      localStore.addCity(s.cityName);
      set(historyList);
    }
  })
});

export const selectedForecast = writable({});
forecast.subscribe(x => {
  if (x.list.length > 0) {
    selectedForecast.set(x.list[0]);
  } 
});


