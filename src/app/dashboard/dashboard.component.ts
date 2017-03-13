import { Component, OnInit, Inject, Input, HostListener } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NodeGraphDialogComponent } from '../node-graph-dialog/node-graph-dialog.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	@Input() ossId;
	name: string = '';
	supplier: string = '';
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.ancho = (event.target.innerWidth) + 'px';
	}
	ancho: string;

	constructor(public dialog: MdDialog) { }

	ngOnInit() {
		this.ancho = (window.innerWidth) + 'px';
	}

	openDialog(node) {
		this.dialog.open(NodeGraphDialogComponent, {
			width: this.ancho,
			data: {
				node: node
			}
		});
	}

}
