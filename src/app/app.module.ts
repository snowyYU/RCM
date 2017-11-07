import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { RootContainerComponent } from 'dolphinng';
import { AsideLeftComponent } from 'dolphinng';
import { HeaderComponent,HeaderLeftComponent,HeaderRightComponent} from 'dolphinng';
import {NavWrapComponent} from 'dolphinng';
import {NavItemComponent} from 'dolphinng';
import {SubNavItemComponent} from 'dolphinng';
import {ThirthNavItemComponent} from 'dolphinng';
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

import { AuthRoleService } from '../services/authRole/authRole.service';
import { SignInService } from './signin/signin.service';
import { PopService } from 'dolphinng'

import { LoginGuard } from '../services/guard/login.guard'
import { OauthGuard } from '../services/guard/oauth.guard'

import {Toaster} from 'dolphinng';

import { ModifyPasswordComponent } from './modifyPassword/modifyPassword.component';
import { MyHttp } from '../services/myHttp/myhttp.service'
import { MyHttpClientInterceptor } from '../services/myHttp/myhttpClient.interceptor'
import { MyHttpClient } from '../services/myHttp/myhttpClient.service'

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent,
    SubmitLoadingComponent,
    RootContainerComponent,
    AsideLeftComponent,
    HeaderComponent,
    HeaderLeftComponent,
    HeaderRightComponent,
    NavWrapComponent,
    NavItemComponent,
    SubNavItemComponent,
    ThirthNavItemComponent,
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
              SignInService,
              AuthRoleService,
              PopService,
              CookieService,
              LoginGuard,
              OauthGuard,
              Toaster,
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
