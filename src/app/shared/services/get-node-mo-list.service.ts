import { Injectable } from '@angular/core';
import { HttpGetServiceService } from './http-get-service.service';
import { EmitterService } from './emitter.service';
import { AppLoadingService } from './app-loading.service';

@Injectable()
export class GetNodeMoListService {

	constructor(private http: HttpGetServiceService) { }

	load() {
		this.http.getnodeMo(1).subscribe(
			result => {
				console.log("Nodes w/data", result);
				this.storeData(result);
			},
			error => console.error(error));
	}

	storeData(data) {
		if (typeof (Storage) !== "undefined" && localStorage.getItem("data") === null) {
			// Code for localStorage/sessionStorage.
			localStorage.setItem("data", JSON.stringify(data));
			EmitterService.get( 'storage' ).emit( "Set storage" );			
			console.log('Set storage');
		} else if(localStorage.getItem("data")) {
			AppLoadingService.get( 'AppLoading' ).emit( 'false' );
		} else {
			console.error("No localStorage");
		}
	}

}
