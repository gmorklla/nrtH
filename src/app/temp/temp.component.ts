import { Component, OnChanges } from '@angular/core';

@Component({
	selector: 'app-temp',
	templateUrl: './temp.component.html',
	styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnChanges {

	startTime;
	finalTime;
	checked: boolean = false;
	disabled: boolean = false;
	activo: boolean = false;
	ultima;

	constructor() { }

	ngOnChanges() {
		console.log(this.startTime);
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
