import { Component, Input } from '@angular/core';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';
import { HttpGetKpis } from '../shared/classes/http-get-kpis';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

	@Input() nodeData;
	radioGroupValue;

	startDateTime;
	finalDateTime;
	startDate;
	startTime;
	endDate;
	endTime;
	mo;
	checked: boolean  = false;
	disabled: boolean = false;
	ultima: boolean   = false;
	loading: boolean  = false;
	accessibility     = 0;
	availability      = 0;
	latency           = 0;
	retainability     = 0;
	rrcfail           = 0;
	througput         = 0;
	kpiRequest: HttpGetKpis;
	nodoMoKpisActual;

	constructor(private http: HttpGetServiceService) { }

	ultimaChange() {
	}

	setRadioVal(evento) {
		this.mo = evento.value;
	}

	setStartTime(evento) {
		var dateTime = this.formatDate(evento);
		this.startDate = dateTime.dia;
		this.startTime = dateTime.hora;
	}

	setFinalTime(evento) {
		var dateTime = this.formatDate(evento);
		this.endDate = dateTime.dia;
		this.endTime = dateTime.hora;
	}

	getKpis() {

		this.loading = true;

		this.resetKpis();

		let nodeId  = this.nodeData[1];
		let moId    = this.mo;
		let ossId   = 'ixt4gr9a';
		let lastest = this.ultima;
		let diaI    = this.startDate;
		let horaI   = this.startTime;
		let diaF    = this.endDate;
		let horaF   = this.endTime;

		if(lastest) {
			diaI  = 1;
			horaI = 1;
			diaF  = 1;
			horaF = 1;
		}

		this.kpiRequest = new HttpGetKpis(nodeId, moId, ossId, lastest, diaI, horaI, diaF, horaF);
		this.http.getKpis(this.kpiRequest).subscribe(
			result => {
				this.loading = false;
				this.nodoMoKpisActual = result;
				console.log(result);
				this.processKpisData(result);
			},
			error => console.error(error));
	}

	formatDate(evento) {
		var nDate   = new Date(evento.value);
		var dia     = formatTwoDigits(nDate.getDate());
		var mes     = formatTwoDigits(nDate.getMonth());
		var year    = nDate.getFullYear();
		var hora    = formatTwoDigits(nDate.getHours());
		var minutos = formatTwoDigits(nDate.getMinutes());

		function formatTwoDigits(arg) {
			if (arg < 10) {
				arg = '0' + arg;
			}
			return arg.toString();
		}

		var tiempo = {
			"dia": year + mes + dia,
			"hora": hora + minutos
		}

		return tiempo;
	}

	processKpisData(kpiData) {
		for (var i = 0; i < kpiData.length; ++i) {
			if(kpiData[i].type == "Accessibility") {
				this.accessibility = kpiData[i].kpis[0].calKpiValue;
			} else if(kpiData[i].type == "Retainability") {
				this.retainability = kpiData[i].kpis[0].calKpiValue;
			} else if(kpiData[i].type == "Availability") {
				this.availability = kpiData[i].kpis[0].calKpiValue;
			} else if(kpiData[i].type == "Throughput") {
				this.througput = kpiData[i].kpis[0].calKpiValue;
			} else if(kpiData[i].type == "RRCFAIL") {
				this.rrcfail = kpiData[i].kpis[0].calKpiValue;
			} else if(kpiData[i].type == "Latency") {
				this.latency = kpiData[i].kpis[0].calKpiValue;
			}
		}
		
	}

	resetKpis() {
		this.availability  = 0;
		this.retainability = 0;
		this.accessibility = 0;
		this.througput     = 0;
		this.rrcfail       = 0;
		this.latency       = 0;
	}

}
