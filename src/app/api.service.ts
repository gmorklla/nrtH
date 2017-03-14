import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

	api = {
		'endpoint': 'http://201.99.115.28:8900/nrt/configuration',
		'endpoint2': 'http://201.99.115.28:8900/nrt/kpis',
		'endpoint3': 'http://201.99.115.28:8900/nrt/configuration/moids'
	}

	getApi() {
		return this.api;
	}

}
