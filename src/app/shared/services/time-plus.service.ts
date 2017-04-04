import { Injectable } from '@angular/core';

@Injectable()
export class TimePlusService {

	constructor() { }

	addTime(tiempo: number, plus: number) {		
		let hour = parseInt(tiempo.toString().slice(0, 2));
		let minutes = parseInt(tiempo.toString().slice(2));

		minutes += plus;

		if (minutes == 60) {
			hour += 1;			
			minutes = 0;
			if (hour == 24) {
				hour = 0;
			}
		}

		let hourAfter = hour.toString();
		let minutesAfter = minutes.toString();		

		if (hourAfter.length < 2) {
			hourAfter = "0" + hour;
		}

		if (minutesAfter.length < 2) {
			minutesAfter = "0" + minutes;
		}

		let timeAFter = hourAfter + minutesAfter;

		return timeAFter;
	}

}
