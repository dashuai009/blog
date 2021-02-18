import { Component, OnInit } from '@angular/core';
import { ServerService, api } from '../server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageArray = ["homePicture/background1.jpg", "homePicture/b4.jpg"];
  height = 'auto';
  autoplay = true;
  autoplaySpeed = '10000';

  output: string = "";
  constructor(private myServer: ServerService) { }

  ngOnInit(): void {
    this.myServer.getArticle('error.log').subscribe(res => {
      //console.log(res);
      this.output = res;
    })
  }

}
