import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ErrorSnackService {

	constructor(public snackBar: MdSnackBar) { }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 5000,
		});
	}

}
