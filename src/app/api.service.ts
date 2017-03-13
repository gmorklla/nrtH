import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

	api = {
		'endpoint': 'assets/mock-data/configuration.json',
		'endpoint2': 'http://0.0.0.1'
	}

	getApi() {
		return this.api;
	}

}
