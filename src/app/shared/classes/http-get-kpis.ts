export class HttpGetKpis {
	constructor(public neId: string, public moid: string, public ossId: string, public latest: boolean, public startDate: number, public startTime: number, public endDate: number, public endTime: number){}
}
