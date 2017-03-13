import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpGetServiceService } from '../shared/services/http-get-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	api1: string;
  data;
  regiones: { nombre: string, oss }[] = [];
  @Output() emitOss = new EventEmitter<any>();

  	constructor(private apiService: ApiService, private http: HttpGetServiceService) { }

  	ngOnInit() {
  		this.api1 = this.apiService.getApi().endpoint;
  		this.gettingData();
  	}

  	gettingData() {
  		this.http.getData(this.api1).subscribe(
            result => {
              this.data = result;
              console.log(this.data);
              this.processData();
            },
            error  => console.error( error ) );
  	}

    processData() {
      if (typeof(Storage) !== "undefined") {
          // Code for localStorage/sessionStorage.
        for (var i = 0; i < this.data.regions.length; ++i) {
          var nombre = this.data.regions[i].name;
          var oss = this.data.regions[i].oss;
          var obj = {
            'nombre': nombre,
            'oss': oss 
          };
          this.regiones.push(obj);
        }
        console.log(this.regiones);
      } else {
          // Sorry! No Web Storage support..
      }
    }

    setOss(oss, region) {
      console.log(oss);
      var dataEmitted = [oss, region]
      this.emitOss.emit(dataEmitted);
    }

}
