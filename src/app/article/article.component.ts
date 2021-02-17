import { Component, OnInit } from '@angular/core';
import { ServerService, api } from '../server.service';

import { ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import * as md from 'markdown-it';
import * as hljs from 'highlight.js';
import * as latex from 'markdown-it-katex';
import * as cheerio from 'cheerio';
import { TagComponent } from 'ng-devui';


interface tag {
  checked: boolean;
  type: string;
  name: string;
};

interface articleLink {
  title: string,
  tags: string[],
  date: string,
}

const latexOptions = {
  inlineOpen: '$',
  inlineClose: '$',
  blockOpen: '$$',
  blockClose: '$$'
};

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {
  result = md().render('# what are you 弄啥勒？');
  tagList: tag[] = new Array();
  tagColor: string[] = ['blue-w98', 'aqua-w98', 'olivine-w98', 'green-w98', 'yellow-w98', 'orange-w98', 'pink-w98', 'red-w98', 'purple-w98'];

  headerJson: articleLink;
  constructor(
    private sanitizer: DomSanitizer, private myServer: ServerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const articleName = this.route.snapshot.paramMap.get('name');
    console.log(articleName);
    this.myServer.getArticle(articleName).subscribe(res => {
      let header = res.split("....------....-")[0];
      let articleBody = res.slice(header.length + 14);
      let headerTmp = JSON.parse(header);
      this.headerJson = headerTmp;

      console.log(this.headerJson);
      for (let i in this.headerJson.tags) {
        this.tagList.push({
          checked: false,
          name: this.headerJson.tags[i],
          type: this.tagColor[Math.floor(Math.random() * 9.99)],
        })

      }


      //"good_luck_buddy".split(/_(.+)/)[1]
      //"luck_buddy"
      let needToChange = md({
        html: true,        // 在源码中启用 HTML 标签
        linkify: true,        // 将类似 URL 的文本自动转换为链接。

        // 启用一些语言中立的替换 + 引号美化
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              // 得到经过highlight.js之后的html代码
              const preCode = hljs.highlight(lang, str, true).value
              // 以换行进行分割
              const lines = preCode.split(/\n/).slice(0, -1)
              // 添加自定义行号
              let html = lines.map((item, index) => {
                return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
              }).join('')
              html = '<ol>' + html + '</ol>'
              // 添加代码语言
              if (lines.length) {
                html += '<b class="name">' + lang + '</b>'
              }
              return '<pre class="hljs"><code>' +
                html +
                '</code></pre>'
            } catch (__) { }
          }

          // 未添加代码语言，此处与上面同理
          const preCode = md.utils.escapeHtml(str)
          const lines = preCode.split(/\n/).slice(0, -1)
          let html = lines.map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
          }).join('')
          html = '<ol>' + html + '</ol>'
          return '<pre class="hljs"><code>' +
            html +
            '</code></pre>'
        }
      }).use(latex, { "throwOnError": false, "errorColor": " #cc0000" })
        .render(`${articleBody}`);

      /*
            let needToChange = cheerio.load(tmp);
            needToChange("img").each(
              function () {
                var imgSrc;
                imgSrc = needToChange(this).attr("src");
                console.log(imgSrc);
                needToChange(this).attr("src", api + `/getImg/${imgSrc}/`);
              }
            );*/
      this.result = this.sanitizer.bypassSecurityTrustHtml(needToChange);
    });
  }

}
