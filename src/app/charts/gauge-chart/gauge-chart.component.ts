import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
	selector: 'app-gauge-chart',
	templateUrl: './gauge-chart.component.html',
	styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit, AfterViewInit {

	gaugeChart;
	@Input() data: number;
	@Input() id: string;
	@Input() title: string;

	constructor() { }

	ngOnInit() { }

	ngAfterViewInit() {
		var chart = c3.generate({
			bindto: '#' + this.id,
			data: {
				columns: [
					[this.title, this.data]
				],
				type: 'gauge',
				// onclick: function(d, i) { console.log("onclick", d, i); },
				// onmouseover: function(d, i) { console.log("onmouseover", d, i); },
				// onmouseout: function(d, i) { console.log("onmouseout", d, i); }
			},
			gauge: {
				label: {
					format: function(value, ratio) {
						return value + '%';
					},
					show: false // to turn off the min/max labels.
				},
				min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
				max: 100, // 100 is default
				units: '%',
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
				height: 80
			}
		});
	}

}
