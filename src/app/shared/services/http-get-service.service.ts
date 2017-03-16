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
	private kpisUrl   = this.apiService.getApi().endpoint2;
	private moIdUrl   = this.apiService.getApi().endpoint3;
	private nodeMoUrl = this.apiService.getApi().endpoint4;

	getConfiguration(): Observable<Response> {

		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.get(this.configUrl, {
			headers: headers
		})
			.map(response => response.json())
			.catch(error => Observable.throw(error || 'Server error'))
			.finally(() => console.log('Finally httpService'));
	}

	getKpis(dataInput: HttpGetKpis): Observable<Response> {

		let neId      = dataInput.neId;
		let moid      = dataInput.moid;
		let ossId     = dataInput.ossId;
		let latest    = dataInput.latest.toString();
		let startDate = dataInput.startDate.toString();
		let startTime = dataInput.startTime.toString();
		let endDate   = dataInput.endDate.toString();
		let endTime   = dataInput.endTime.toString();

		let data = {
			"neId"      : neId,
			"moid"      : moid,
			"ossId"     : ossId,
			"latest"    : latest,
			"startDate" : startDate,
			"startTime" : startTime,
			"endDate"   : endDate,
			"endTime"   : endTime
		};

		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.post(this.kpisUrl, data, {
			headers: headers
		})
			.map(response => response.json())
			.catch(error => Observable.throw(error || 'Server error'))
			.finally(() => console.log('Finally httpService'));
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

	getnodeMo() {
		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.get(this.nodeMoUrl, {
			headers: headers
		})
			.map(response => response.json())
			.catch(error => Observable.throw(error || 'Server error'))
			.finally(() => console.log('Finally httpService'));

	}

}
