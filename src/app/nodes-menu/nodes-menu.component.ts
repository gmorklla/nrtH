import { Component, OnInit, Inject, Input, HostListener, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdProgressBar } from '@angular/material';
import { NodeGraphDialogComponent } from '../node-graph-dialog/node-graph-dialog.component';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';
import { HttpGetKpis } from '../shared/classes/http-get-kpis';

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
	mo: Array<Object>;
	loading: boolean = false;
	@ViewChild(MdProgressBar) progressBar: MdProgressBar;
	@Output() emitNodeData = new EventEmitter<any>();
	nodosActuales = [];

	constructor(public dialog: MdDialog, private http: HttpGetServiceService) { }

	ngOnInit() {
		this.ancho = (window.innerWidth) + 'px';
		this.procesar(JSON.parse(localStorage.getItem("data")));
	}

	ngOnChanges() {
		if (this.ossId != null) {
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
		this.ossId = null;
	}

	getMoList(nodo) {
		this.loading = true;
		let neId = nodo.nodeId;
		this.setNodeData(nodo);

		// this.http.getMo(neId).subscribe(
		// 	result => {
		// 		this.mo = result;
		// 		this.loading = false;
		// 		console.log(nodo);
		// 		this.setNodeData(nodo);
		// 	},
		// 	error => console.error(error)
		// );
	}

	// getKpis(nodo) {

	// 	console.log(nodo);
	// 	this.progressBar.color = 'accent';
	// 	let indice = this.mo.indexOf("=") + 1;
	// 	let mo = this.mo.slice(indice);

	// 	let neId = nodo.nodeId;
	// 	let moid = mo;
	// 	let ossId = nodo.ossId;
	// 	let latest = true;
	// 	let startDate = 20170213;
	// 	let startTime = 1005;
	// 	let endDate = 20170213;
	// 	let endTime = 1105;

	// 	let data: HttpGetKpis = new HttpGetKpis(neId, moid, ossId, latest, startDate, startTime, endDate, endTime);

	// 	this.http.getKpis(data).subscribe(
	// 		result => {
	// 			console.info(result);
	// 		},
	// 		error => console.error(error)
	// 	);

	// }

	setNodeData(nodo) {
		// var dataEmitted = [this.ossId[1], nodo, this.mo];
		var dataEmitted = [this.ossId[1], nodo.nodeId, nodo.moId];
		this.emitNodeData.emit(dataEmitted);
		this.closeNodesMenu();
		this.ossId = null;
	}

	procesar(x) {
		for (var i = 0; i < x.length; ++i) {
			var obj = {
				nodeId: '',
				moId: ''
			};
			var str = x[i];
			var indice = str.indexOf(':');
			var node = str.slice(0, indice);
			var indice2 = str.indexOf('D=') + 2;
			var mo = str.slice(indice2);
			obj.nodeId = node;
			obj.moId = mo;
			this.nodosActuales.push(obj);
		}
		console.log(this.nodosActuales);
	}

}
