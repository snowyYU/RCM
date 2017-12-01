import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import {SharedModule} from './shared/shared.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';
import { SubmitLoadingComponent } from '../utils/submit-loading/submit-loading.component';
import { SubmitLoadingService } from '../utils/submit-loading/submit-loading.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FocusDirective } from '../directives/focus/focus.directive';

import { CookieService } from 'ng2-cookies'

// import { MyHttp } from '../services/myHttp/myhttp.service';
import { SessionStorageService } from '../services/session-storage/session-storage.service' 
import { AuthRoleService } from '../services/authRole/authRole.service';

import { LoginGuard } from '../services/guard/login.guard'
import { OauthGuard } from '../services/guard/oauth.guard'


import { ModifyPasswordComponent } from './modifyPassword/modifyPassword.component';
import { MyHttp } from '../services/myHttp/myhttp.service'
import { MyHttpClientInterceptor } from '../services/myHttp/myhttpClient.interceptor'
import { MyHttpClient } from '../services/myHttp/myhttpClient.service'

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

import { PopService } from 'dolphinng'
import {Toaster} from 'dolphinng';
import { LibraryService } from 'snowy-library-ng'

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent,
    SubmitLoadingComponent,
    ModifyPasswordComponent,
    FocusDirective,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [
              PopService,
              Toaster,
              LibraryService,
              AuthRoleService,
              SessionStorageService,
              CookieService,
              LoginGuard,
              OauthGuard,
              SubmitLoadingService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: MyHttpClientInterceptor,
                multi: true,
              },
              MyHttp,
              MyHttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
