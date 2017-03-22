import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

	@Input() data: number;
	@Input() title;
	@ViewChild('chart') elemento: ElementRef;
	private htmlElement: HTMLElement;
	private host;

	constructor() { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.htmlElement = this.elemento.nativeElement;
		this.host = d3.select(this.htmlElement);
		this.generarChart();
	}

	ngOnChanges() {
		this.generarChart();
	}

	generarChart() {
		var chart = c3.generate({
			bindto: this.host,
			data: {
				columns: [
					[this.title, 0]
				],
				type: 'bar',
				colors: {
					nombre: '#ff0000'
				},
			},
			transition: {
				duration: 2000
			},
			grid: {
				x: {
					show: false
				},
				y: {
					show: true
				}
			},
			bar: {
				width: {
					ratio: 0.5 // this makes bar width 50% of length between ticks
				}
				// or
				//width: 100 // this makes bar width 100px
			},
			size: {
				height: 300
			},
		});
		chart.load({
			columns: [[this.title, this.data]]
		});
	}

}
