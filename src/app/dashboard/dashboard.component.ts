import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

	@Input() nodeData;
	radioGroupValue;

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
		if(this.nodeData) {
			console.log(this.nodeData);
		}
		
	}

}
