import { Component, OnInit } from '@angular/core';
import * as fsm from './fsm.js';

@Component({
  selector: 'app-fsm',
  templateUrl: './fsm.component.html',
  styleUrls: ['./fsm.component.scss']
})
export class FsmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    fsm.onLoad();
  }

}
