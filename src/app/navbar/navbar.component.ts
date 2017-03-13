import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	nombre = 'NRT Monitorign';
	@Output() openSideNav = new EventEmitter<any>();

	openNavFn() {
		this.openSideNav.emit('Abre!');
	}	

  constructor() { }

  ngOnInit() {
  }

}
