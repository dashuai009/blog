import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageArray = ["homePicture/background1.jpg"];
  height = '500px';
  autoplay = true;
  autoplaySpeed = '3000';
  constructor() { }

  ngOnInit(): void {
  }

}
