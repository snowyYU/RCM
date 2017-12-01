import { RouterModule,Routes } from '@angular/router';
import { CheckComponent } from './check.component';

import { AuthenticationComponent } from './authentication/authentication.component'
import { AuthCheckComponent } from './authentication/auth-check/auth-check.component'
import { AuthDetailComponent } from './authentication/detail/auth-detail.component'

import { CreditComponent } from './credit/credit.component'
import { CreditCheckComponent } from './credit/credit-check/credit-check.component'
import { CreditDetailComponent } from './credit/credit-detail/credit-detail.component'

import { UseApplyComponent } from './use/use-apply.component'
import { UseDetailComponent } from './use/detail/use-detail.component'
import { UseCheckComponent } from './use/check/use-check.component'

import { SpreadComponent } from './spread/spread.component'
import { SpreadDetailComponent } from './spread/spread-detail/spread-detail.component'
import { SpreadCheckComponent } from './spread/spread-check/spread-check.component'

const routes: Routes =[
	{
		path:'',
		component: CheckComponent
	},
	{
		path:'authentication',
		component:AuthenticationComponent

	},
	{
		path:'authentication/authCheck/:id',
		component:AuthCheckComponent

	},
	{
		path:'authentication/authDetail/:id',
		component:AuthDetailComponent

	},
	{
		path:'credit',
		component:CreditComponent

	},
	{
		path:'credit/creditCheck/:id',
		component:CreditCheckComponent

	},
	{
		path:'credit/creditDetail/:id',
		component:CreditDetailComponent

	},
	{
		path:'use',
		component:UseApplyComponent
	},
	{
		path:'use/useDetail/:id',
		component:UseDetailComponent
	},
	{
		path:'use/useCheck/:id',
		component:UseCheckComponent
	},
	{
		path:'spread',
		component:SpreadComponent

	},
	{
		path:'spread/spreadDetail/:id',
		component:SpreadDetailComponent

	},
	{
		path:'spread/spreadCheck/:id',
		component:SpreadCheckComponent

	},
]

export const routing = RouterModule.forChild(routes);

