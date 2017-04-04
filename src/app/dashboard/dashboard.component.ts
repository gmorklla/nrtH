import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';
import { HttpGetKpis } from '../shared/classes/http-get-kpis';
import { ONM } from '../shared/classes/onm';
import { KpiValuesService } from '../shared/services/kpi-values.service';
import { ErrorSnackService } from '../shared/services/error-snack.service';
import { VarsActService } from '../shared/services/vars-act.service';
import { IntervalRequestService } from '../shared/services/interval-request.service';
import { EmitterService } from '../shared/services/emitter.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {

	@Input() nodeData: any;
	radioGroupValue;

	startDate;
	startTime;
	endDate;
	endTime;
	mo;
	checked: boolean = false;
	disabled: boolean = false;
	ultima: boolean = true;
	loading: boolean = false;
	accessibility: number = 0;
	availability: number = 0;
	latency: number = 0;
	retainability: number = 0;
	rrcfail: number = 0;
	througput: number = 0;
	kpiRequest: HttpGetKpis;
	kpiInfo;
	kpiProps: Array<{ nombre: number, valor: number }> = [];
	nodoMoKpisActual;
	tiempo: string;
	softAlarm: string;

	constructor(private http: HttpGetServiceService, private kpiValues: KpiValuesService, private errorSnack: ErrorSnackService, private props: VarsActService, private intervaloS: IntervalRequestService) { }

	ngOnInit() {
		EmitterService.get('Kpis').subscribe((res) => {
			this.processKpisData(res);
		});
	}

	ngOnChanges() {

	}

	ultimaChange() {
	}

	setRadioVal(evento) {
		this.mo = evento.value;
		if(this.ultima || this.startDate != undefined && this.startTime != undefined && this.endDate != undefined && this.endTime != undefined) {
			this.getKpis();
		}
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
		if (this.startDate != undefined && this.startTime != undefined) {
			this.getKpis();
		}
	}

	getKpis() {

		this.kpiInfo = null;
		this.nodoMoKpisActual = null;

		this.loading = true;

		this.resetKpis();

		let nodeId = this.nodeData[1];
		let moId = this.mo;
		let ossId = 'ixt4gr9a';
		let lastest = this.ultima;
		let diaI = this.startDate;
		let horaI = this.startTime;
		let diaF = this.endDate;
		let horaF = this.endTime;

		if (lastest == true) {
			diaI = 1;
			horaI = 1;
			diaF = 1;
			horaF = 1;
		} else {
			diaI = 20170213;
			diaF = 20170213;
		}

		console.log("Original: ", horaF);

		var propiedades = new ONM(ossId, nodeId, moId, diaI, horaI, diaF, horaF);
		this.props.setProps(propiedades);

		if (this.mo == undefined || this.mo == null) {
			this.errorSnack.openSnackBar("Select a Mo", "Ok");
			this.loading = false;
			return;
		}

		this.kpiRequest = new HttpGetKpis(nodeId, moId, ossId, lastest, diaI, horaI, diaF, horaF);

		this.http.getKpis(this.kpiRequest, 1).subscribe(
			result => {
				this.loading = false;
				console.log(result);
				this.props.setKpis(result);
				this.nodoMoKpisActual = result;
				this.processKpisData(result);
				this.intervaloS.updateChart();
			},
			error => {
				console.error(error);
				this.errorSnack.openSnackBar("Error", "Ok");
			});
	}

	formatDate(evento) {
		var nDate = new Date(evento.value);
		var dia = formatTwoDigits(nDate.getDate());
		var mes = formatTwoDigits(nDate.getMonth());
		var year = nDate.getFullYear();
		var hora = formatTwoDigits(nDate.getHours());
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

	processKpisData(result) {		
		let indice = result[0].kpis.length - 1;
		// let tiempo = data[0].kpis[0].time.slice(0, 2) + ":" + data[0].kpis[0].time.slice(2);
		for (var i = 0; i < result.length; ++i) {
			if (result[i].kpis[indice] != undefined) {
				this.tiempo = result[0].kpis[indice].time.slice(0, 2) + ":" + result[0].kpis[indice].time.slice(2);
				if (result[i].type == "Accessibility") {
					this.accessibility = result[i].kpis[indice].calKpiValue;
				} else if (result[i].type == "Retainability") {
					this.retainability = result[i].kpis[indice].calKpiValue;
				} else if (result[i].type == "Availability") {
					this.availability = result[i].kpis[indice].calKpiValue;
				} else if (result[i].type == "Throughput") {
					this.througput = result[i].kpis[indice].calKpiValue;
				} else if (result[i].type == "RRCFAIL") {
					this.rrcfail = result[i].kpis[indice].calKpiValue;
				} else if (result[i].type == "Latency") {
					this.latency = result[i].kpis[indice].calKpiValue;
				}
			} else {
				let mensaje = "Kpi without data";
				this.errorSnack.openSnackBar(mensaje, "Ok");
			}
		}

	}

	resetKpis() {
		this.availability = 0;
		this.retainability = 0;
		this.accessibility = 0;
		this.througput = 0;
		this.rrcfail = 0;
		this.latency = 0;
	}

	emittedKpi(evento) {
		// console.info(evento, this.nodoMoKpisActual);
		let data = this.props.getKpis();
		console.log("EmittedKpi data", data);
		var encontrado = false;
		for (var i = 0; i < data.length; ++i) {
			if (data[i].type == evento || data[i].type == evento.toUpperCase()) {
				this.kpiInfo = data[i];
				encontrado = true;
			}
		}
		if (encontrado) {
			console.log("Encontrado");
			if (this.kpiInfo.kpis.length != 0) {
				this.getSoftAlarm();
				this.procesaKpiValues();
			} else {
				this.errorSnack.openSnackBar("Kpi without data", "Ok");
			}	
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
		//console.log(this.kpiProps);	
	}

	gettingKpiGValue(event) {
		//this.nodoMoKpisActual = event[3];
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

	getSoftAlarm() {
		this.loading = true;
		let indice = this.kpiInfo.kpis.length - 1;

		let tipo;
		let dateTime = this.kpiInfo.kpis[indice].date + this.kpiInfo.kpis[indice].time;
		// dateTime = dateTime.split(':')[0] + dateTime.split(':')[1];

		switch (this.kpiInfo.type) {
			case "Accessibility":
				tipo = '0';
				break;
			case "Retainability":
				tipo = '3';
				break;
			case "Availability":
				tipo = '1';
				break;
			case "Throughput":
				tipo = '5';
				break;
			case "RRCFAIL":
				tipo = '4';
				break;
			case "Latency":
				tipo = '2';
				break;

			default:
				console.error("No valid kpi type");
				break;
		}

		this.http.getSoftAlarm(tipo, dateTime).subscribe(
			result => {
				this.loading = false;
				console.log(result[1]);
				this.softAlarm = result[1];
			},
			error => console.error(error)
		);
	}

}
