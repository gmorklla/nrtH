import { Component, OnInit, Inject, Input, HostListener, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { MdProgressBar } from '@angular/material';
import { NodeGraphDialogComponent } from '../node-graph-dialog/node-graph-dialog.component';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';
import { ErrorSnackService } from '../shared/services/error-snack.service';
import { AppLoadingService } from '../shared/services/app-loading.service';
import * as _ from 'underscore';

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

	constructor(public dialog: MdDialog, private http: HttpGetServiceService, private errorSnack: ErrorSnackService) { }

	ngOnInit() {
		this.ancho = (window.innerWidth) + 'px';

		AppLoadingService.get( 'AppLoading' ).emit( 'true' );

		if(localStorage.getItem("data")) {
			this.procesar(JSON.parse(localStorage.getItem("data")));
		}

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
		// this.loading = true;
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

	setNodeData(nodo) {
		// var dataEmitted = [this.ossId[1], nodo, this.mo];
		var mensaje = 'Nodo seleccionado: ' + nodo.nodeId;
		this.errorSnack.openSnackBar(mensaje, "Ok");
		var dataEmitted = [this.ossId[1], nodo.nodeId, nodo[nodo.nodeId]];
		console.log('dataEmitted:', dataEmitted);
		this.emitNodeData.emit(dataEmitted);
		this.closeNodesMenu();
		this.ossId = null;
	}

	procesar(x) {
		for (var i = 0; i < x.length; ++i) {
			var obj = {};
			var agregado = false;

			var str = x[i];
			var indice = str.indexOf(':');
			var node = str.slice(0, indice);
			var indice2 = str.indexOf('D=') + 2;
			var mo = str.slice(indice2);
			obj[node] = [];
			obj[node].push(mo);
			obj['nodeId'] = node;

			for (var j = 0; j < this.nodosActuales.length; ++j) {
				if (this.nodosActuales[j][node]) {
					this.nodosActuales[j][node].push(mo);
					agregado = true;
				}
			}

			// obj.nodeId = node;
			// obj.moId.push(mo);
			if (agregado == false) {
				this.nodosActuales.push(obj);
			}

		}
		AppLoadingService.get( 'AppLoading' ).emit( 'false' );
		// console.log(this.nodosActuales);
	}

}
