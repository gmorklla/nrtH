import { Component, OnInit, Inject, Input, HostListener, OnChanges, ViewChildren, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdMenuTrigger } from '@angular/material'
import { NodeGraphDialogComponent } from '../node-graph-dialog/node-graph-dialog.component';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';

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
	mo;
	nodoActual = [];
	@ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

	constructor(public dialog: MdDialog, private http: HttpGetServiceService) { }

	ngOnInit() {
		this.ancho = (window.innerWidth) + 'px';
	}

	ngOnChanges() {
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

	getMoList(nodo, e) {
		this.nodoActual = [];
    	let neId = nodo;

    	this.http.getMo(neId).subscribe(
    	  result => {
    	    this.mo = result.moidList[0].moidName;
    	    this.nodoActual[neId] = true;
    	    ;
    	  },
    	  error => console.error(error)
    	);
	}

}
