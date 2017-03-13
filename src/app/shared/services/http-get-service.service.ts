import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpGetServiceService {

  constructor(private http: Http) { }

	getData(url: string): Observable<Response> {

		// let data2 = "{'data':'" + data + "'}"

		let headers = new Headers();
		headers.append('Content-Type', "application/json;charset=utf-8");

		return this.http.get(url, {
			headers: headers
		})
		.map(     response => response.json() )
		.catch(   error => Observable.throw(error || 'Server error') )
		.finally( () => console.log('Finally httpService') );
	}  

}
