import { Injectable } from '@angular/core';

@Injectable()
export class KpiValuesService {

	constructor() { }

	retainabilityValues = ['pmErabEstabSuccInit', 'pmErabRelAbnormalEnbAct', 'pmErabRelMmeAct'];
	accessibilityValues = ['pmErabEstabAttInit', 'pmErabEstabSuccInit', 'pmRrcConnEstabAtt', 'pmRrcConnEstabAttReatt', 'pmRrcConnEstabSucc', 'pmS1SigConnEstabAtt', 'pmS1SigConnEstabSucc'];
	availabilityValues  = ['pmCellDowntimeAuto', 'pmCellDowntimeMan'];
	throughputValues    = ['pmPdcpVolDlDrb', 'pmPdcpVolDlDrbLastTTI', 'pmUeThpTimeDl'];
	rrcfailValues       = ['pmRrcConnEstabAtt', 'pmRrcConnEstabSucc'];
	latencyValues       = ['pmPdcpLatPktTransDl', 'pmPdcpLatTimeDl'];

	getValues(type: string) {
		var valoresPedidos;
		switch (type) {
			case "Retainability":
				valoresPedidos = this.retainabilityValues;
				break;

			case "Accessibility":
				valoresPedidos = this.accessibilityValues;
				break;

			case "Availability":
				valoresPedidos = this.availabilityValues;
				break;

			case "Throughput":
				valoresPedidos = this.throughputValues;
				break;

			case "RRCFAIL":
				valoresPedidos = this.rrcfailValues;
				break;

			case "Latency":
				valoresPedidos = this.latencyValues;
				break;

			default:
				valoresPedidos = "Default";
				break;
		}
		return valoresPedidos;
	}

}
