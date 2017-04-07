import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

  // 201.99.115.28
  // 192.168.101.250
  // Ecoss ip: 10.119.175.15

	api = {
		'endpoint'  : 'http://201.99.115.28:8900/nrt/configuration',
		'endpoint2' : 'http://201.99.115.28:8900/nrt/kpis',
		'endpoint3' : 'http://201.99.115.28:8900/nrt/configuration/moids',
		'endpoint4' : 'http://201.99.115.28:8900/nrt/kpis/nodes',
		'endpoint5' : 'http://201.99.115.28:8900/nrt/softalarm/quarterly',
		'endpoint6' : 'http://201.99.115.28:8900/nrt/softalarm/hourly',
		'endpoint7' : 'http://201.99.115.28:8900/nrt/configuration/reg2oss/'
	}

	api2 = {
		'endpoint'  : './assets/mock-data/configuration2.json',
		'endpoint2' : 'http://201.99.115.28:8900/nrt/kpis',
		'endpoint3' : 'http://201.99.115.28:8900/nrt/configuration/moids',
		'endpoint4' : './assets/mock-data/nodeMo.json'
	}

	apiEcoss = {
		'endpoint'  : 'http://10.119.175.15:8900/nrt/configuration',
		'endpoint2' : 'http://10.119.175.15:8900/nrt/kpis',
		'endpoint3' : 'http://10.119.175.15:8900/nrt/configuration/moids',
		'endpoint4' : 'http://10.119.175.15:8900/nrt/kpis/nodes',
		'endpoint5' : 'http://10.119.175.15:8900/nrt/softalarm/quarterly',
		'endpoint6' : 'http://10.119.175.15:8900/nrt/softalarm/hourly'
	}

	getApi() {
		return this.api;
	}

	getJsons() {
		return this.api2;
	}

}
