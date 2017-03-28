import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { HttpGetKpis } from '../classes/http-get-kpis';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpGetServiceService {

	constructor(private http: Http, private apiService: ApiService) { }

	private configUrl = this.apiService.getApi().endpoint;
	private kpisUrl = this.apiService.getApi().endpoint2;
	private moIdUrl = this.apiService.getApi().endpoint3;
	private nodeMoUrl = this.apiService.getApi().endpoint4;

	private configUrl2 = this.apiService.getJsons().endpoint;
	private nodeMoUrl2 = this.apiService.getJsons().endpoint4;

	getConfiguration(type: number): Observable<Response> {

		let url;

		if (type == 2) {
			url = this.configUrl2;
		} else if (type == 1) {
			url = this.configUrl;
		}

		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.get(url, {
			headers: headers
		})
			.map(response => response.json())
			.catch(error => Observable.throw(error || 'Server error'))
			.finally(() => console.log('Finally httpService'));
	}

	getKpis(dataInput: HttpGetKpis, type: number): Observable<Response> {

		let neId = dataInput.neId;
		let moid = dataInput.moid;
		let ossId = dataInput.ossId;
		let latest = dataInput.latest.toString();
		let startDate = dataInput.startDate.toString();
		let startTime = dataInput.startTime.toString();
		let endDate = dataInput.endDate.toString();
		let endTime = dataInput.endTime.toString();

		let data = {
			"neId": neId,
			"moid": moid,
			"ossId": ossId,
			"latest": latest,
			"startDate": startDate,
			"startTime": startTime,
			"endDate": endDate,
			"endTime": endTime
		};

		// console.log(data);

		let url;

		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		if (type == 2) {
			url = this.whatKpi(data.neId, data.moid);

			return this.http.get(url, {
				headers: headers
			})
				.map(response => response.json())
				.catch(error => Observable.throw(error || 'Server error'))
				.finally(() => console.log('Finally httpService'));
		} else if (type == 1) {
			url = this.kpisUrl;

			return this.http.post(url, data, {
				headers: headers
			})
				.map(response => response.json())
				.catch(error => Observable.throw(error || 'Server error'))
				.finally(() => console.log('Finally httpService'));
		}


	}

	getMo(dataInput: string) {
		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.get(this.moIdUrl + '/' + dataInput, {
			headers: headers
		})
			.map(response => response.json())
			.catch(error => Observable.throw(error || 'Server error'))
			.finally(() => console.log('Finally httpService'));

	}

	getnodeMo(type: number) {

		let url;

		if (type == 2) {
			url = this.nodeMoUrl2;
		} else if (type == 1) {
			url = this.nodeMoUrl;
		}

		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.get(url, {
			headers: headers
		})
			.map(response => response.json())
			.catch(error => Observable.throw(error || 'Server error'))
			.finally(() => console.log('Finally httpService'));

	}

	whatKpi(node, mo) {
		let nodeMo = node + mo;
		let url;
		switch (nodeMo) {
			case "GT7880L2100117880001":
				url = "./assets/mock-data/kpi1.json";
				break;

			case "GT7880L2100117880002":
				url = "./assets/mock-data/kpi2.json";
				break;

			case "GT7880L2100117880003":
				url = "./assets/mock-data/kpi3.json";
				break;

			case "MX6922L2100156922002":
				url = "./assets/mock-data/kpi4.json";
				break;

			case "MX6922L2100156922003":
				url = "./assets/mock-data/kpi5.json";
				break;

			case "MX6922L2100156922001":
				url = "./assets/mock-data/kpi6.json";
				break;

			case "MO8884L2100178884001":
				url = "./assets/mock-data/kpi7.json";
				break;

			case "MO8884L2100178884002":
				url = "./assets/mock-data/kpi8.json";
				break;

			case "MO8884L2100178884003":
				url = "./assets/mock-data/kpi9.json";
				break;

			case "DF0411L2100090411001":
				url = "./assets/mock-data/kpi10.json";
				break;

			case "DF0411L2100090411002":
				url = "./assets/mock-data/kpi11.json";
				break;

			case "DF0411L2100090411003":
				url = "./assets/mock-data/kpi12.json";
				break;

			case "MX1167L2100151167001":
				url = "./assets/mock-data/kpi13.json";
				break;

			case "MX1167L2100151167002":
				url = "./assets/mock-data/kpi14.json";
				break;

			case "MX1167L2100151167003":
				url = "./assets/mock-data/kpi15.json";
				break;

			default:
				// code...
				break;
		}
		return url;
	}

}
