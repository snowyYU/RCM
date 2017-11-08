import { Injectable } from '@angular/core';

@Injectable()
export class SubmitLoadingService {
	show:boolean=false;
	icon:string="spinner";
	size:string="middle";
	constructor() {}
}