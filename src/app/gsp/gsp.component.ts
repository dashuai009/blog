import { Component, OnInit } from '@angular/core';
declare var GGBApplet: any;
@Component({
  selector: 'app-gsp',
  templateUrl: './gsp.component.html',
  styleUrls: ['./gsp.component.scss']
})
export class GspComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var params = {
      "appName": "geometry",
      "width": 1000,
      "height": 500,
      "showToolBar": true,
      "showAlgebraInput": true,
      "showMenuBar": true
    };
    var ggbApplet = new GGBApplet(params, true);
    ggbApplet.setHTML5Codebase('https://cdn.geogebra.org/apps/5.0.534.0/web3d');
    ggbApplet.inject('ggb-element');
  }

}
