import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';
import { HttpGetKpis } from '../shared/classes/http-get-kpis';
import { KpiValuesService } from '../shared/services/kpi-values.service';
import { ErrorSnackService } from '../shared/services/error-snack.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnChanges {

	@Input() nodeData: any;
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
	ultima: boolean   = true;
	loading: boolean  = false;
	accessibility     = 0;
	availability      = 0;
	latency           = 0;
	retainability     = 0;
	rrcfail           = 0;
	througput         = 0;
	kpiRequest: HttpGetKpis;
	kpiInfo;
	kpiProps: Array<{nombre: number, valor: number}> = [];
	nodoMoKpisActual;
	tiempo;

	constructor(private http: HttpGetServiceService, private kpiValues: KpiValuesService, private errorSnack: ErrorSnackService) { }

	ngOnChanges(changes: SimpleChanges) {		
		if(changes['nodeData']) {
			// console.log(changes);
		}
	}

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

		if(this.mo == undefined || this.mo == null) {
			this.errorSnack.openSnackBar("Por favor, selecciona un MO", "Ok");
			this.loading = false;
			return;
		}

		this.kpiRequest = new HttpGetKpis(nodeId, moId, ossId, lastest, diaI, horaI, diaF, horaF);

		this.http.getKpis(this.kpiRequest, 2).subscribe(
			result => {
				this.loading = false;
				console.log(result);
				this.nodoMoKpisActual = result;				
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

	emittedKpi(evento) {
		// console.info(evento, this.nodoMoKpisActual);
		var encontrado = false;
		for (var i = 0; i < this.nodoMoKpisActual.length; ++i) {			
			if (this.nodoMoKpisActual[i].type == evento || this.nodoMoKpisActual[i].type == evento.toUpperCase()) {
				this.kpiInfo = this.nodoMoKpisActual[i];
				encontrado = true;
			}
		}
		if(encontrado) {
			this.procesaKpiValues();
		}
	}

	procesaKpiValues() {
		console.log(this.kpiInfo);

		this.kpiProps = [];

		var propiedades = this.kpiValues.getValues(this.kpiInfo.type);

		for (var i = 0; i < propiedades.length; ++i) {
			var obj = {
				'nombre': propiedades[i],
				'valor': this.kpiInfo.kpis[0][propiedades[i]]
			}
			this.kpiProps.push(obj);
		}
		console.log(this.kpiProps);	
	}

	gettingKpiGValue(event) {
		this.tiempo = event[2];
		switch (event[0]) {
			case "Accessibility":
				this.accessibility = event[1];
				break;
			case "Retainability":
				this.retainability = event[1];
				break;
			case "Availability":
				this.availability = event[1];
				break;
			case "Throughput":
				this.througput = event[1];
				break;
			case "RRCFAIL":
				this.rrcfail = event[1];
				break;
			case "Latency":
				this.latency = event[1];
				break;
			
			default:
				console.error("No valid kpi name");
				break;
		}
	}

}
