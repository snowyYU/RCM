import { RouterModule, Routes, Data } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';
const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full', data: { title: '登录' } },
    { path: 'signin', component: SigninComponent, data: { title: '登录' } }, 
    {
        path: '',
        component: IndexComponent,
        data: { title: '首页' },
        children: [
            { 
                path: 'home', 
                loadChildren: './home/home.module#HomeModule', 
                data: { title: '首页' } 
            },
            { 
                path: 'check', 
                loadChildren: './check/check.module#CheckModule',
                data: { title: '审批事项'}
            },
            
        ]
    }
];
export const routing = RouterModule.forRoot(routes);
