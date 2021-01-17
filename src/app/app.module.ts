import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { DEVUI_LANG, ZH_CN } from 'ng-devui/i18n';
import { AppComponent } from './app.component';
import { ThemePickerModule } from './theme-picker/theme-picker.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TagComponent } from './tag/tag.component';
import { GspComponent } from './gsp/gsp.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    TagComponent,
    GspComponent,
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
        { path: '**', component: HomeComponent }
      ]
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }