import { Component, OnInit } from '@angular/core';
//import * as fsm from './fsm.js';
import * as fsm from './myFSM';

@Component({
  selector: 'app-fsm',
  templateUrl: './fsm.component.html',
  styleUrls: ['./fsm.component.scss']
})

export class FsmComponent implements OnInit {
  output: string = "";

  constructor() { }

  ngOnInit(): void {
    fsm.onLoad();
  }

  saveAsSVG() {
    this.output = fsm.saveAsSVG();
  }
  saveAsLaTeX() {
    this.output = fsm.saveAsLaTeX();
    console.log(this.output)
  }

}
