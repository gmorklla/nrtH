import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AppLoadingService } from './shared/services/app-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';
  ossEmitted;
  nodeDataEmitted;
  appLoading: boolean;
  @ViewChild('sidenav') sidenav;

  constructor() { }

  ngOnInit() {
    this.appLoading = true;
  }

  ngAfterViewInit() {
    AppLoadingService.get('AppLoading').subscribe((res) => {
      console.log(res);
      this.appLoadingStatus(res);
    });
  }

  openIt() {
    this.sidenav.toggle();
  }
  emittedOss(x) {
    this.ossEmitted = x;
  }
  emittedNodeData(x) {
    this.nodeDataEmitted = x;
  }
  appLoadingStatus(x: string) {
      if(x == "true") {
        this.appLoading = true;
      } else {
        this.appLoading = false;
      }
  }
}
