import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './shared/services/api.service';
import { KpiValuesService } from './shared/services/kpi-values.service';
import { GetNodeMoListService } from './shared/services/get-node-mo-list.service';
import { HttpGetServiceService } from './shared/services/http-get-service.service';
import { ErrorSnackService } from './shared/services/error-snack.service';
import { AppLoadingService } from './shared/services/app-loading.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Md2Module }  from 'md2';
import { LOCALE_ID } from '@angular/core';
import 'hammerjs';
import 'underscore';
import { SearchPipePipe } from './search-pipe.pipe';
import { NodeGraphDialogComponent } from './node-graph-dialog/node-graph-dialog.component';
import { NodesMenuComponent } from './nodes-menu/nodes-menu.component';
import { TempComponent } from './temp/temp.component';
import { GaugeChartComponent } from './charts/gauge-chart/gauge-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { KpisTableComponent } from './tables/kpis-table/kpis-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    SearchPipePipe,
    NodeGraphDialogComponent,
    NodesMenuComponent,
    TempComponent,
    GaugeChartComponent,
    BarChartComponent,
    KpisTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2PaginationModule,
    Md2Module.forRoot()
  ],
  entryComponents: [NodeGraphDialogComponent],
  providers: [ApiService, HttpGetServiceService, ErrorSnackService, GetNodeMoListService, AppLoadingService, KpiValuesService, { provide: LOCALE_ID, useValue: "es-MX" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
