import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';
import { HttpGetKpis } from '../shared/classes/http-get-kpis';
import { GetNodeMoListService } from '../shared/services/get-node-mo-list.service';
import { ErrorSnackService } from '../shared/services/error-snack.service';
import { AppLoadingService } from '../shared/services/app-loading.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  data;
  regiones: { nombre: string, oss }[] = [];
  oss;
  @Output() emitOss = new EventEmitter<any>();
  @Output() openSideNav = new EventEmitter<any>();

  openNavFn() {
    this.openSideNav.emit('Abre!');
  }  

  constructor(private http: HttpGetServiceService, private dataNodeMo: GetNodeMoListService, private errorSnack: ErrorSnackService) { }

  ngOnInit() {
    this.gettingData();
    // this.http.retreiveOss().subscribe(
    //     results => {
    //       console.log(results[0], results[1], results[2]);
    //       this.processData(results);
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //  );
  }

  gettingData() {
    AppLoadingService.get( 'AppLoading' ).emit( 'true' );
    this.http.getConfiguration(1).subscribe(
      result => {
        this.data = result;
        console.log("Configuration data: ", this.data);
        this.processData();
      },
      error => {
        console.error(error);        
        this.errorSnack.openSnackBar("Error de conexión", "Ok");
      });
  }

  processData() {
    // let ossArr = [];

    // for(var i = 0; i < x.length; i ++) {
    //   if(x[i].ossList.length > 0) {        
    //     for(var j = 0; j < x[i].ossList.length; j ++) {
    //       ossArr.push(x[i].ossList[j]);
    //     }
    //   }
    // }

    // this.oss = ossArr;

    for (var i = 0; i < this.data.regions.length; ++i) {
      var nombre = this.data.regions[i].name;
      var oss = this.data.regions[i].oss;
      var obj = {
        'nombre': nombre,
        'oss': oss
      };
      this.regiones.push(obj);
    }
  }

  setOss(oss, region) {
    console.log(oss);
    var dataEmitted = [oss, region]
    this.emitOss.emit(dataEmitted);
  }

}
