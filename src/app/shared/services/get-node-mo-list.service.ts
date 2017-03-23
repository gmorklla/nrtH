import { Injectable } from '@angular/core';
import { HttpGetServiceService } from './http-get-service.service';

@Injectable()
export class GetNodeMoListService {

	constructor(private http: HttpGetServiceService) {
		this.http.getnodeMo(2).subscribe(
			result => {
				this.storeData(result);
			},
			error => console.error(error));
	}

	storeData(data) {
		if (typeof (Storage) !== "undefined" && localStorage.getItem("data") === null) {
			// Code for localStorage/sessionStorage.
			localStorage.setItem("data", JSON.stringify(data));
			console.log('Set storage');
		} else {
			// Sorry! No Web Storage support..
		}
	}

}
