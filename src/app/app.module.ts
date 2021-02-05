import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { AppComponent } from './app.component';
import { ThemePickerModule } from './theme-picker/theme-picker.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TagComponent } from './tag/tag.component';
import { GspComponent } from './gsp/gsp.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    TagComponent,
    GspComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DevUIModule.forRoot(),
    FormsModule,
    ThemePickerModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'home', component: HomeComponent },
        { path: 'list', component: ListComponent },
        { path: 'gsp', component: GspComponent },
        { path: 'tag', component: TagComponent },
        //{ path: 'article', redirectTo: '/list', pathMatch: "full" },
        { path: 'article/:name', component: ArticleComponent },
        { path: '**', redirectTo: '/home' }
      ]
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }