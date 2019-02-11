import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Should I Bike Or Metro?'
  subtitle = 'A Very Cool App for the DC Metro Area'
  constructor() { }

  ngOnInit() {
  }

}
