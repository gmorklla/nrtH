import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-kpis-table',
	templateUrl: './kpis-table.component.html',
	styleUrls: ['./kpis-table.component.css']
})
export class KpisTableComponent implements OnChanges {

	@Input() kpisData: any;
	data: any = null;

	constructor() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['kpisData']) {
			// console.info(this.kpisData);
			this.data = this.kpisData;
		}
	}

}
