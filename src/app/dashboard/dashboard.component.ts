import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

	@Input() nodeData;
	radioGroupValue;

	startTime;
	finalTime;
	checked: boolean = false;
	disabled: boolean = false;
	activo: boolean = false;
	ultima;

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
		if(this.nodeData) {
			console.log(this.nodeData);
		}
		
	}

	ultimaChange() {
		console.log(this.ultima);
		if(this.ultima) {
			this.activo = true;
		} else {
			this.activo = false;
		}
	}

}
