import { Injectable } from '@angular/core';
import { HttpGetServiceService } from './http-get-service.service';

@Injectable()
export class GetNodeMoListService {

	constructor(private http: HttpGetServiceService) {
		this.http.getnodeMo().subscribe(
			result => {
				this.storeData(result);
			},
			error => console.error(error));
	}

	storeData(data) {
		if (typeof (Storage) !== "undefined") {
			// Code for localStorage/sessionStorage.
			localStorage.setItem("data", JSON.stringify(data));
			console.log('Set storage');
		} else {
			// Sorry! No Web Storage support..
		}
	}

}
