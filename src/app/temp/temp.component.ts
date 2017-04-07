import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EmitterService } from '../shared/services/emitter.service';
import { ErrorSnackService } from '../shared/services/error-snack.service';

@Component({
	selector: 'app-temp',
	templateUrl: './temp.component.html',
	styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit, OnChanges {

	@Input() data;
	title: string = '';

	constructor(private errorSnack: ErrorSnackService) { }

	ngOnInit() {
		EmitterService.get('Kpis').subscribe((res) => {
			this.processData(res);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['data']) {
			if (this.barChartData.length == 0 && this.data.kpis.length > 0) {
				console.log("Data chart: ", this.data);
				let indice = this.data.kpis.length - 1;
				this.title = this.data.type;
				let valor = this.data.kpis[indice].calKpiValue;
				let time = this.data.kpis[indice].time;
				time = time.slice(0, 2) + ":" + time.slice(2);
				this.barChartOptions.title.text = this.title;
				this.barChartLabels.push(time);
				this.barChartData.push({ data: [valor], label: this.title });
			}
		}
	}

	public barChartOptions: any = {
		scaleShowVerticalLines: true,
		responsive: true,
		barValueSpacing: 5,
		fill: true,
		title: {
			display: true,
			padding: 20,
			fontStyle: 'bold',
			fontSize: 20,
			text: this.title
		},
		tooltips: {
			intersect: false
		},
		scales: {
			yAxes: [{
				ticks: {
					max: 100,
					beginAtZero: true,
					callback: function(value) {
						return Number(value).toFixed(0);
					}
				}
			}
			]
		}
	};
	public barChartLabels: string[] = [];
	public barChartType: string = 'line';
	public barChartLegend: boolean = false;
	public lineChartColors: Array<any> = [
		{ // blue
			backgroundColor: 'rgba(0,156,213,0.5)',
			borderColor: '#00b3f3',
			pointBackgroundColor: 'rgba(0,156,213,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	];

	public barChartData: any[] = [
		// { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
	];

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	public processData(result): void {
		let valor;
		let time;
		let titulo = this.data.type;
		for (var i = 0; i < result.length; ++i) {
			if (result[i].type == this.data.type) {
				if (result[i].kpis[0] != undefined && result[i].kpis.length > 0) {
					let numero = result[i].kpis.length - 1;
					valor = result[i].kpis[numero].calKpiValue;
					time = result[i].startTime;
					time = time.slice(0, 2) + ":" + time.slice(2);
					//Update here
					let clone = JSON.parse(JSON.stringify(this.barChartData));
					if (clone[0]) {
						clone[0].data.push(valor);
						this.barChartData = clone;
					} else {
						this.title = this.data.type;
						this.barChartOptions.title.text = this.title;
						this.barChartData.push({ data: [valor], label: this.title });
					}
					this.barChartLabels.push(time);

				} else {
					let mensaje = "There is no kpi data";
					this.errorSnack.openSnackBar(mensaje, "Ok");
				}
			}
		}
	}


}
