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

	getApi() {
		return this.api;
	}

}
