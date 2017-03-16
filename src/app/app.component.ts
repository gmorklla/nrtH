import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app works!';
	ossEmitted;
  nodeDataEmitted;
	@ViewChild('sidenav') sidenav;

  constructor() {}

	openIt() {
  		this.sidenav.toggle();
  	}
  	emittedOss(x) {
  		this.ossEmitted = x;
  	}
    emittedNodeData(x) {
      this.nodeDataEmitted = x;
    }
}
