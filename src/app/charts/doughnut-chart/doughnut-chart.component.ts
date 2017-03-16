import { Component } from '@angular/core';

@Component({
	selector: 'app-doughnut-chart',
	templateUrl: './doughnut-chart.component.html',
	styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent {

	public doughnutChartLabels: string[] = ['Rate', ''];
	public doughnutChartData: number[] = [80, 20];
	public doughnutChartType: string = 'doughnut';

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}
