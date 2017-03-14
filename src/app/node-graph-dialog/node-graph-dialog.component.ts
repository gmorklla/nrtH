import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
// import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
	selector: 'app-node-graph-dialog',
	templateUrl: './node-graph-dialog.component.html',
	styleUrls: ['./node-graph-dialog.component.css']
})
export class NodeGraphDialogComponent implements OnInit {

	name: string;
	ossId: string;
	chart;
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.ancho = event.target.innerWidth - 100;
		this.chart.resize({ width: this.ancho })
	}
	ancho: number;
	@ViewChild('webSocketDisplay') webSocketDisplay;
	// ws;

	constructor(public dialogRef: MdDialogRef<NodeGraphDialogComponent>) {
		console.log('data', this.dialogRef.config.data);
		this.name = this.dialogRef.config.data.node.name;
		this.ossId = this.dialogRef.config.data.node.ossId;
	}

	ngOnInit() {
		this.ancho = window.innerWidth - 100;
		this.chart = c3.generate({
			bindto: '#chart',
			size: {
				width: this.ancho
			},
			data: {
				x: 'x',
				columns: [
					['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
					['data1', 100, 200, 100, 400, 150, 250],
					['data2', 130, 340, 200, 500, 250, 350]
				],
				axes: {
					data2: 'y2'
				},
				types: {
					data2: 'bar' // ADD
				},
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%d-%m-%Y'
					}
				},
				y: {
					label: {
						text: 'data1',
						position: 'outer-middle'
					}
				},
				y2: {
					show: true,
					label: {
						text: 'data2',
						position: 'outer-middle'
					}
				}
			}
		});

		this.updateData(this.chart);

		// this.ws = new $WebSocket("ws://echo.websocket.org/");

		// console.info(this.ws);

		// // set received message stream
		// this.ws.getDataStream().subscribe(
		// 	(msg) => {
		// 		console.log("next", msg.data);
		// 		this.ws.close(false);
		// 	},
		// 	(msg) => {
		// 		console.log("error", msg);
		// 	},
		// 	() => {
		// 		console.log("complete");
		// 	}
		// );

		// // send with default send mode (now default send mode is Observer)
		// this.ws.send("some thing").subscribe(
		// 	(msg) => {
		// 		console.log("next", msg.data);
		// 	},
		// 	(msg) => {
		// 		console.log("error", msg);
		// 	},
		// 	() => {
		// 		console.log("complete");
		// 	}
		// );

	}

	updateData(x) {

		setTimeout(function() {
			x.flow({
				columns: [
					['x', '2013-01-07', '2013-01-08'],
					['data1', 400, 200],
					['data2', 100, 300]
				],
				length: 2,
				duration: 1500,
				done: function() {
					x.flow({
						columns: [
							['x', '2013-01-09', '2013-01-10'],
							['data1', 200, 300],
							['data2', 100, 150]
						],
						length: 2,
						duration: 1500,
						done: function() {
							x.flow({
								columns: [
									['x', '2013-01-11', '2013-01-12'],
									['data1', 200, 300],
									['data2', 150, 250]
								],
								length: 2,
								duration: 1500,
								done: function() {
									x.flow({
										columns: [
											['x', '2013-01-13', '2013-01-14'],
											['data1', 400, 200],
											['data2', 100, 150]
										],
										length: 2,
										duration: 1500,
									});
								}
							});
						}
					});
				},
			});
		}, 2000);

	}

}
