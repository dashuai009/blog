import { Component, OnInit } from '@angular/core';
import { ServerService, articleLink } from '../server.service';


interface tag {
  checked: boolean;
  type: string;
  name: string;
  num: string[];
};


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listArray: articleLink[];
  firstChangeChecked: boolean = true;

  tagList: tag[] = new Array();
  tagMap: Map<string, string[]> = new Map();// tagName  res编号
  tagColor: string[] = ['blue-w98', 'aqua-w98', 'olivine-w98', 'green-w98', 'yellow-w98', 'orange-w98', 'pink-w98', 'red-w98', 'purple-w98'];
  constructor(private myServer: ServerService) { }

  ngOnInit(): void {
    this.myServer.showList().subscribe(res => {
      for (let i in res) {
        let item = res[i];
        res[i].show = true;//起先每一个都要展示
        for (let j in item.tags) {
          if (this.tagMap.has(item.tags[j])) {
            this.tagMap.get(item.tags[j]).push(i);
          } else {
            this.tagMap.set(item.tags[j], [i]);
          }
        }
      }

      this.listArray = res;

      for (let [key, value] of this.tagMap) {
        this.tagList.push({
          checked: false,
          type: this.tagColor[Math.floor(Math.random() * 9.99)],
          name: key,
          num: value
        })
      }

    });
  }
  changeChecked(tagItem: tag) {
    if (this.firstChangeChecked) {
      for (let i in this.tagList) {
        let item = this.tagList[i];
        for (let j in item.num) {
          this.listArray[item.num[j]].show = item.checked;
        }
      }
      this.firstChangeChecked = false;
    } else {
      for (let j in tagItem.num) {
        this.listArray[tagItem.num[j]].show = tagItem.checked;
      }
    }
  }
  getZoom(cnt) {
    if (cnt > 10) {
      return 2;
    } else {
      return 1.0 + cnt / 10;
    }
  }



}
