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
  @Output() emitOss = new EventEmitter<any>();
  @Output() openSideNav = new EventEmitter<any>();

  openNavFn() {
    this.openSideNav.emit('Abre!');
  }  

  constructor(private http: HttpGetServiceService, private dataNodeMo: GetNodeMoListService, private errorSnack: ErrorSnackService) { }

  ngOnInit() {
    this.gettingData();
  }

  gettingData() {
    AppLoadingService.get( 'AppLoading' ).emit( 'true' );
    this.http.getConfiguration(2).subscribe(
      result => {
        this.data = result;
        // console.log(this.data);
        this.processData();
        AppLoadingService.get( 'AppLoading' ).emit( 'false' );
      },
      error => {
        console.error(error);        
        this.errorSnack.openSnackBar("Error de conexión", "Ok");
      });
  }

  processData() {
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
