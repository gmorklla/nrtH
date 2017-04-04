import { Injectable } from '@angular/core';
import { ONM } from '../classes/onm';

@Injectable()
export class VarsActService {

	private propiedades: ONM;
	private kpis;

	constructor() { }

	setProps(obj: ONM) {
		this.propiedades = obj;
	}

	getProps() {
		return this.propiedades;
	}

	setInitTime(initTime: number) {
		this.propiedades.horaI = initTime;
	}

	setFinalTime(finalTime: number) {
		this.propiedades.horaF = finalTime;
	}

	setInitDate(initDate: number) {
		this.propiedades.diaI = initDate;
	}

	setFinalDate(finalDate: number) {
		this.propiedades.diaF = finalDate;
	}

	setKpis(arg) {
		this.kpis = arg;
	}

	getKpis() {
		return this.kpis;
	}


}
