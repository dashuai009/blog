import { Component, OnInit, NgZone, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { I18nService } from 'ng-devui/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  logoSrc = '../../favicon.ico';
  clickSub: Subscription = new Subscription();

  constructor(private renderer2: Renderer2, private ngZone: NgZone, private router: Router, private i18n: I18nService) {
    const oldHandler = this.router.errorHandler;
    this.router.errorHandler = (err: any) => {
      // 加载失败的时候刷新重试一次
      if (err.stack && err.stack.indexOf('Error: Loading chunk') >= 0) {
        if (localStorage.getItem('lastChunkError') !== err.stack) {
          localStorage.setItem('lastChunkError', err.stack);
          window.location.reload();
        } else {
          console.error(`We really don't find the chunk...`);
        }
      }
      oldHandler(err);
    };
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const headerMenu = document.querySelector('#headerMenu');
      const headerNode = headerMenu.parentNode;
      const containerNode = document.querySelector('.app-container');
      this.clickSub.add(fromEvent(headerMenu, 'click').subscribe(e => {
        if (headerMenu.classList.contains('active')) {
          this.renderer2.removeClass(headerMenu, 'active');
          this.renderer2.removeClass(headerNode, 'active');
        } else {
          this.renderer2.addClass(headerMenu, 'active');
          this.renderer2.addClass(headerNode, 'active');
        }
      }));
      this.clickSub.add(fromEvent(containerNode, 'click').subscribe(e => {
        if (headerMenu.classList.contains('active') && !(<any>headerNode).contains(e.target)) {
          this.renderer2.removeClass(headerMenu, 'active');
          this.renderer2.removeClass(headerNode, 'active');
        }
      }));
    });

  }
}
