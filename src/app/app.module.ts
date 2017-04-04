import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Md2Module } from 'md2';
import { LOCALE_ID } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';
import 'underscore';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './shared/services/api.service';
import { VarsActService } from './shared/services/vars-act.service';
import { IntervalRequestService } from './shared/services/interval-request.service';
import { TimePlusService } from './shared/services/time-plus.service';
import { KpiValuesService } from './shared/services/kpi-values.service';
import { EmitterService } from './shared/services/emitter.service'
import { GetNodeMoListService } from './shared/services/get-node-mo-list.service';
import { HttpGetServiceService } from './shared/services/http-get-service.service';
import { ErrorSnackService } from './shared/services/error-snack.service';
import { AppLoadingService } from './shared/services/app-loading.service';
import { SearchPipePipe } from './search-pipe.pipe';
import { NodeGraphDialogComponent } from './node-graph-dialog/node-graph-dialog.component';
import { NodesMenuComponent } from './nodes-menu/nodes-menu.component';
import { TempComponent } from './temp/temp.component';
import { GaugeChartComponent } from './charts/gauge-chart/gauge-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { KpisTableComponent } from './tables/kpis-table/kpis-table.component';
import { LineChartKpiComponent } from './charts/line-chart-kpi/line-chart-kpi.component';

export function startupServiceFactory(startupService: GetNodeMoListService): Function {
  return () => startupService.load();
}

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
    KpisTableComponent,
    LineChartKpiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2PaginationModule,
    ChartsModule,
    Md2Module.forRoot()
  ],
  entryComponents: [NodeGraphDialogComponent],
  providers: [
      ApiService,
      VarsActService,    
      TimePlusService,
      IntervalRequestService,
      EmitterService,
      HttpGetServiceService,
      ErrorSnackService,
      GetNodeMoListService,
      AppLoadingService,
      KpiValuesService,
      { provide: LOCALE_ID, useValue: "es-MX" },
      { // Provider for APP_INITIALIZER
        provide: APP_INITIALIZER,
        useFactory: startupServiceFactory,
        deps: [GetNodeMoListService],
        multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
