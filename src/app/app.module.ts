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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FocusDirective } from '../directives/focus/focus.directive';

import { CookieService } from 'ng2-cookies'

import { MyHttp } from '../services/myHttp/myhttp.service';
import { AuthRoleService } from '../services/authRole/authRole.service';
import { SignInService } from './signin/signin.service';
import { PopService } from 'dolphinng'



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    IndexComponent,
    RootContainerComponent,
    AsideLeftComponent,
    HeaderComponent,
    HeaderLeftComponent,
    HeaderRightComponent,
    NavWrapComponent,
    NavItemComponent,
    SubNavItemComponent,
    ThirthNavItemComponent,
    FocusDirective,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,

    
  ],
  providers: [MyHttp,SignInService,AuthRoleService,PopService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
