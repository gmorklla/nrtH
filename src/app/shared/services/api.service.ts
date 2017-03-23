import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

  // 201.99.115.28
  // 192.168.101.250

	api = {
		'endpoint': 'http://201.99.115.28:8900/nrt/configuration',
		'endpoint2': 'http://201.99.115.28:8900/nrt/kpis',
		'endpoint3': 'http://201.99.115.28:8900/nrt/configuration/moids',
		'endpoint4': 'http://201.99.115.28:8900/nrt/kpis/nodes'
	}

	api2 = {
		'endpoint': './assets/mock-data/configuration2.json',
		'endpoint2': 'http://201.99.115.28:8900/nrt/kpis',
		'endpoint3': 'http://201.99.115.28:8900/nrt/configuration/moids',
		'endpoint4': './assets/mock-data/nodeMo.json'
	}

	getApi() {
		return this.api;
	}

	getJsons() {
		return this.api2;
	}

}
