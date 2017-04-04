import { Component, Input, OnChanges, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
	selector: 'app-gauge-chart',
	templateUrl: './gauge-chart.component.html',
	styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements AfterViewInit, OnChanges {
	
	@Input() data: number;
	@Input() title: string;
	@Output() emitKpiSelected = new EventEmitter<any>();
	@ViewChild('chart') elemento: ElementRef;
	private htmlElement: HTMLElement;
	private host;
	private chart;

	constructor() { }

	ngAfterViewInit() {
		this.htmlElement = this.elemento.nativeElement;
		this.host = d3.select(this.htmlElement);
		this.generarChart();
	}

	ngOnChanges() {
		this.generarChart();
	}

	generarChart() {

		this.chart = c3.generate({
			bindto: this.host,
			data: {
				columns: [
					[this.title, 0]
				],
				type: 'gauge',
				// onclick: function(d, i) { 
				// 	console.log("onclick", d);					
				// },				
				// onmouseover: function(d, i) { console.log("onmouseover", d, i); },
				// onmouseout: function(d, i) { console.log("onmouseout", d, i); }
			},
			transition: {
				duration: 2000
			},
			gauge: {
				label: {
					format: function(value, ratio) {
						return value + '%';
					},
					show: true // to turn off the min/max labels.
				},
				min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
				max: 100, // 100 is default
				// units: 'kpi',
				width: 25 // for adjusting arc thickness
			},
			color: {
				pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
				threshold: {
					//            unit: 'value', // percentage is default
					//            max: 200, // 100 is default
					values: [25, 50, 75, 100]
				}
			},
			size: {
				height: 120
			},
			// oninit: function () { console.log(this); }
		});
		this.chart.load({
			columns: [[this.title, this.data]]
		});
	}

	emitiendo() {
		this.emitKpiSelected.emit(this.title);
	}

}
