import { Injectable } from '@angular/core';
import { HttpGetServiceService } from './http-get-service.service';
import { HttpGetKpis } from '../classes/http-get-kpis';

@Injectable()
export class KpiUpdateService {

	constructor(private http: HttpGetServiceService) { }

	updateKpi(kpiRequest: HttpGetKpis) {
		this.http.getKpis(kpiRequest, 1).subscribe(
			result => {
				console.log(result);
			},
			error => console.error(error));
	}

}
