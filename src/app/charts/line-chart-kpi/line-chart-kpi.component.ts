import { Component, OnChanges, ViewChild, Input, ElementRef, AfterViewInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
	selector: 'app-line-chart-kpi',
	templateUrl: './line-chart-kpi.component.html',
	styleUrls: ['./line-chart-kpi.component.css']
})
export class LineChartKpiComponent implements AfterViewInit, OnChanges {

	@ViewChild('chart') elemento: ElementRef;
	@Input() data;
	@Output() kpiGValue = new EventEmitter<any>();
	private htmlElement: HTMLElement;
	private host;
	private afterEle;
	private visibility: boolean = true;
	private chartType: string = "bar";

	constructor() { }

	ngAfterViewInit() {
		this.htmlElement = this.elemento.nativeElement;
		this.host = d3.select(this.htmlElement);

		this.generarChart();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['data']) {
			// console.log(changes);
		}
	}

	generarChart() {

		let titulo = this.data.type;
		let { calKpiValue, time } = this.data.kpis[0];

		time = time.slice(0, 2) + ":" + time.slice(2);

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
					['x', time],
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

		this.kpiGValue.emit([this.data.type, calKpiValue, time]);

		this.afterEle = chart;
		this.updateChart(titulo);
	}

	updateChart(titulo) {

		let counter = 0;
		let timeArr = ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45"];

		setInterval(() => {
			if (counter < timeArr.length) {
				let valor = Math.round(Math.random() * 100) + 1;
				this.afterEle.flow({
					columns: [
						['x', timeArr[counter]],
						[titulo, valor]
					],
					duration: 1500,
					length: 0,

				});
				this.kpiGValue.emit([this.data.type, valor, timeArr[counter]]);
			}
			counter++;
		}, 5000);

	}

	changeGraph() {		
		if(this.chartType == "bar") {
			this.afterEle.transform('bar');
			this.chartType = "line";
		} else {
			this.afterEle.transform('line');
			this.chartType = "bar";
		}
		
	}

}
