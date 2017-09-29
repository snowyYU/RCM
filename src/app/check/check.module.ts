import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CheckComponent } from './check.component';

import { AuthenticationComponent } from './authentication/authentication.component'
import { AuthCheckComponent } from './authentication/auth-check/auth-check.component'
import { AuthDetailComponent } from './authentication/detail/auth-detail.component'

import { CreditComponent } from './credit/credit.component'
import { CreditCheckComponent } from './credit/credit-check/credit-check.component'
import { CreditDetailComponent } from './credit/credit-detail/credit-detail.component'

import { SpreadComponent } from './spread/spread.component'
import { SpreadDetailComponent } from './spread/spread-detail/spread-detail.component'

//导入table组件
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';




import {routing} from './check.routes'

@NgModule({
	declarations:[
		CheckComponent,
		AuthenticationComponent,
		AuthCheckComponent,
		AuthDetailComponent,
		CreditComponent,
		CreditCheckComponent,
		CreditDetailComponent,
		SpreadComponent,
		SpreadDetailComponent
		],
	imports:[
		SharedModule,
		PDataTableModule,
    	PSharedModule,
		routing
	]
})
export class CheckModule {

}