import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { MessageComponent } from './message/message.component';


const routes: Routes =[
	{
		path:'',
		component: HomeComponent
	},
	{
		path:'message',
		component:MessageComponent

	},
	
]

export const routing = RouterModule.forChild(routes);

