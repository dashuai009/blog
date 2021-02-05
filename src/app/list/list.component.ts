import { Component, OnInit } from '@angular/core';
import { ServerService, articleLink } from '../server.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listArray: articleLink[];
  constructor(private myServer: ServerService) { }

  ngOnInit(): void {
    this.myServer.showList().subscribe(res => {
      console.log(res);
      this.listArray = res;
    });
  }





}
