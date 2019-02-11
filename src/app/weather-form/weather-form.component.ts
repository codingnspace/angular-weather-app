import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {
  model: any = {};
  weather: object[];
  results: [];
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  d: Date = new Date();
  currentDay: number = this.d.getDay();
  nextDay: number = this.currentDay + 1;


  nextSevenDays: string[] = this.daysOfWeek.slice(this.currentDay).concat(this.daysOfWeek.slice(0, this.nextDay));

  formattedDate: any= (daysToAdd) => {
    const futureDate = moment().add(daysToAdd, 'days');
    return futureDate.format('YYYY-MM-DD');
  };

 weekDays: any = this.nextSevenDays
  .map((day, idx) => {
    const dateHash = this.formattedDate(idx);
    return {
      dateHash: `${dateHash}T00:00:00`,
      idx,
      day
    };
})
  .filter((dayWithHash) => dayWithHash.day !== 'Sunday' && dayWithHash.day !== 'Saturday');
  constructor(private weatherService: WeatherService) {
    this.weather =[]
  }

  ngOnInit() {
    this.weekDays.map(dayWithOffset => {
      console.log(dayWithOffset)
      this.weatherService.getWeather(dayWithOffset)
      .subscribe((data) => {
        console.log(data)
        this.weather.push(data)
      })
    })
  }

  onSubmit() {
    this.results = this.weekDays.map((dayWithOffset, idx) => {
      const morningCommute = (this.weather[idx] && this.weather[idx].hourly )&& this.weather[idx].hourly.data[8];
      const eveningCommute = (this.weather[idx] && this.weather[idx].hourly) && this.weather[idx].hourly.data[17];
      // When the any of the user sumbitted conditions exceed the weather conditions in the evening
      // or morning set decision for that day as 'metro'
      // console.log(this.weather)
      // console.log(this.model, 'model')
      console.log(morningCommute, 'morningCommute')
      // console.log(eveningCommute, 'eveningCommut')
      if ((morningCommute && eveningCommute) && morningCommute.temperature < this.model.minTemp
          || morningCommute.temperature > this.model.maxTemp
          || (morningCommute.precipProbability > (this.model.maxRain / 100) && morningCommute.precipType === 'rain')
          || eveningCommute.temperature < this.model.minTemp
          || eveningCommute.temperature > this.model.maxTemp
          || (eveningCommute.precipProbability > (this.model.maxRain / 100) && morningCommute.precipType === 'rain')) {
        return {
          day: dayWithOffset.day,
          decision: 'metro',
          idx: dayWithOffset.idx
        };
      } else {
        return {
          day: dayWithOffset.day,
          decision: 'bike',
          idx: dayWithOffset.idx
        };
      }
    })
  }
}
