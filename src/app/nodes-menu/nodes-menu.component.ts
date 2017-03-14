import { Component, OnInit, Inject, Input, HostListener, OnChanges } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NodeGraphDialogComponent } from '../node-graph-dialog/node-graph-dialog.component';

@Component({
  selector: 'app-nodes-menu',
  templateUrl: './nodes-menu.component.html',
  styleUrls: ['./nodes-menu.component.css']
})
export class NodesMenuComponent implements OnInit, OnChanges {

	@Input() ossId;
	name: string = '';
	supplier: string = '';
	@HostListener('window:resize', ['$event']) onResize(event) {
		this.ancho = (event.target.innerWidth) + 'px';
	}
	ancho: string;
	aparece: boolean;

	constructor(public dialog: MdDialog) { }

	ngOnInit() {
		this.ancho = (window.innerWidth) + 'px';
	}

	ngOnChanges() {
		console.log("Ahora");
		if(this.ossId != null) {
			this.aparece = true;
		} else {
			this.aparece = false;
		}
	}

	openDialog(node) {
		this.dialog.open(NodeGraphDialogComponent, {
			width: this.ancho,
			data: {
				node: node
			}
		});
	}

	closeNodesMenu() {
		this.aparece = false;
		setTimeout(function () {
			this.ossId = null;
		}, 1000);
	}

}
