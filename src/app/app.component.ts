import { Component, OnInit } from '@angular/core';
import WOW from 'wowjs'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyecto';
  ngOnInit() {
    new WOW.WOW().init();
  }
}
