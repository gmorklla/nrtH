import { Injectable } from '@angular/core';
import { HttpGetServiceService } from './http-get-service.service';
import { VarsActService } from './vars-act.service';
import { TimePlusService } from './time-plus.service';
import { HttpGetKpis } from '../../shared/classes/http-get-kpis';
import { EmitterService } from './emitter.service';

@Injectable()
export class IntervalRequestService {

	constructor(private http: HttpGetServiceService, private props: VarsActService, private addTime: TimePlusService) { }

	horaI;
	horaF;
	intervalo;
	private kpiRequest: HttpGetKpis;

	// Fn to update the chart
	updateChart() {

		// Get the initial and final time that was input for the user
		this.horaI = this.props.getProps().horaI;
		this.horaF = this.props.getProps().horaF;

		if (this.horaI == 1) {
			console.log("Latest option, for now return");
			return;
		}
		// Set the interval in which will be requested the info to the server
		this.intervalo = setInterval(() => {
			this.repeatKpiCall();
		}, 5000);
	}

	repeatKpiCall() {
		// Add 15 min to the initial time for the next request
		this.horaI = this.addTime.addTime(this.horaI, 15);
		// Add 15 min to the final time for the next request
		this.horaF = this.addTime.addTime(this.horaF, 15);

		let propiedades = this.props.getProps();		

		this.kpiRequest = new HttpGetKpis(propiedades.node, propiedades.mo, propiedades.oss, false, propiedades.diaI, this.horaI, propiedades.diaF, this.horaF);

		if (parseInt(this.horaI) < 1200) {
			this.http.getKpis(this.kpiRequest, 1).subscribe(
				result => {
					this.props.setKpis(result);
					EmitterService.get( 'Kpis' ).emit( result );
					// this.processData(result);
				},
				error => {
					console.error(error);
					// this.errorSnack.openSnackBar("Error", "Ok");
				});
		} else {
			clearInterval(this.intervalo);
		}
	}

}
