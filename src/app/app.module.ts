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



@NgModule({
  declarations: [
    AppComponent,
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
        {
          path: '',
          redirectTo: '',
          pathMatch: 'full'
        }
      ]
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }