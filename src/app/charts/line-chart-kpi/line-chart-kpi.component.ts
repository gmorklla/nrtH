import { Component, OnChanges, OnInit, ViewChild, Input, ElementRef, AfterViewInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { VarsActService } from '../../shared/services/vars-act.service';
import { HttpGetKpis } from '../../shared/classes/http-get-kpis';
import { HttpGetServiceService } from '../../shared/services/http-get-service.service';
import { TimePlusService } from '../../shared/services/time-plus.service';
import { ErrorSnackService } from '../../shared/services/error-snack.service';
import { EmitterService } from '../../shared/services/emitter.service';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
	selector: 'app-line-chart-kpi',
	templateUrl: './line-chart-kpi.component.html',
	styleUrls: ['./line-chart-kpi.component.css']
})
export class LineChartKpiComponent implements OnInit, AfterViewInit, OnChanges {

	// Getting html element ref for embeded the graph
	@ViewChild('chart') elemento: ElementRef;
	private htmlElement: HTMLElement;
	// Input where the data from the dashboard is passed
	@Input() data;
	// Output where we emit the kpiValue for the dashboard gauge update
	@Output() kpiGValue = new EventEmitter<any>();
	// D3 select for the c3 library
	private host;
	// Element where the reference to the c3 element will persit for later update
	private afterEle;
	// Boolean for show/hide the graph
	private visibility: boolean = true;
	// Type of graph that can be transform
	private chartType: string = "bar";
	// Interval that will repeat the call
	private intervalo;
	// Counter for iteration
	private counter = 0;
	// Local variable for track the initial time of the request
	private horaI;
	// Local variable for track the final time of the request
	private horaF;

	private kpiRequest: HttpGetKpis;

	constructor(private props: VarsActService, private http: HttpGetServiceService, private addTime: TimePlusService, private errorSnack: ErrorSnackService) { }

	ngOnInit() {
		// Get the initial and final time that was input for the user
		this.horaI = this.props.getProps().horaI;
		this.horaF = this.props.getProps().horaF;
		EmitterService.get('Kpis').subscribe((res) => {
			this.processData(res);
		});
	}

	ngAfterViewInit() {
		// Setting the element ref after the view has been initialized
		this.htmlElement = this.elemento.nativeElement;
		this.host = d3.select(this.htmlElement);
		// Call fn that will generate the chart
		this.generarChart();
	}

	ngOnChanges(changes: SimpleChanges) {
		// Clear the interval if new data arrive from the dashboard
		if (changes['data']) {
			clearInterval(this.intervalo);
		}
	}

	generarChart() {

		// The type of kpi
		let titulo = this.data.type;
		// If the specific combination of oss node mo date time has not kpi value return the fn for avoid crash in the app
		if (this.data.kpis[0] == undefined) {
			console.log("No hay datos de kpi");
			return;
		}
		// Declare kpi value and time for the c3 use
		let { calKpiValue, time } = this.data.kpis[0];

		console.info(this.data.kpis[0]);
		// Format the time for displaying it in the chart
		time = time.slice(0, 2) + ":" + time.slice(2);
		// c3 generate with config object
		var chart = c3.generate({
			bindto: this.host,
			size: {
				height: 300
			},
			padding: { left: 30, right: 0 },
			data: {
				x: 'x',
				xFormat: '%H:%M',
				columns: [
					['x', '10:00'],
					[titulo, calKpiValue]
				],
				type: 'line'
			},
			color: {
				pattern: ['#009cd5']
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%H:%M',
						centered: true,
						fit: true,
						rotate: 90,
					}
				},
				y: {
					max: 100
				}
			}
		});
		// Emit the value of the kpi and its time to the dashboard component consumption
		this.kpiGValue.emit([this.data.type, calKpiValue, time]);
		// Set the element with the c3 reference to the private property that will be updated later
		this.afterEle = chart;
	}
	// Fn to change the type of chart between line and bar
	changeGraph() {
		if (this.chartType == "bar") {
			this.afterEle.transform('bar');
			this.chartType = "line";
		} else {
			this.afterEle.transform('line');
			this.chartType = "bar";
		}

	}

	processData(result) {
		let valor;
		let time;
		let titulo = this.data.type;
		for (var i = 0; i < result.length; ++i) {
			if (result[i].type == this.data.type) {
				if (result[i].kpis[0] != undefined) {
					let numero = result[i].kpis.length - 1;
					valor = result[i].kpis[numero].calKpiValue;
					time = result[i].kpis[numero].time;
					this.kpiGValue.emit([this.data.type, valor, time]);
					time = time.slice(0, 2) + ":" + time.slice(2);
					this.afterEle.flow({
						columns: [
							['x', time],
							[titulo, valor]
						],
						duration: 1500,
						length: 0,

					});
				} else {
					let mensaje = "There is no kpi data";
					this.errorSnack.openSnackBar(mensaje, "Ok");
				}
			}
		}
	}

}
