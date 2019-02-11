import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { WeatherService } from './weather.service';
import { ResultsComponent } from './results/results.component';
import { DisplaySwitcherComponent } from './display-switcher/display-switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherFormComponent,
    ResultsComponent,
    DisplaySwitcherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
