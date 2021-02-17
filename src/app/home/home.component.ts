import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageArray = ["homePicture/background1.jpg", "homePicture/b4.jpg"];
  height = '500px';
  autoplay = true;
  autoplaySpeed = '10000';
  constructor() { }

  ngOnInit(): void {
  }

}
