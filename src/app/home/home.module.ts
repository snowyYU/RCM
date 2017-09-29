import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { HomeComponent } from './home.component';

import { MessageComponent } from './message/message.component';

//导入table组件
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';




import {routing} from './home.routes'

@NgModule({
	declarations:[
		HomeComponent,
		MessageComponent,
		],
	imports:[
		SharedModule,
		PDataTableModule,
    	PSharedModule,
		routing
	]
})
export class HomeModule {

}