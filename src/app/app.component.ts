import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';
	ossEmitted;
	@ViewChild('sidenav') sidenav;
	openIt() {
  		this.sidenav.toggle();
  	}
  	emittedOss(x) {
  		this.ossEmitted = x;
  	}
}
