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
import { GetNodeMoListService } from './shared/services/get-node-mo-list.service';
import { HttpGetServiceService } from './shared/services/http-get-service.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import 'hammerjs';
import 'underscore';
import { SearchPipePipe } from './search-pipe.pipe';
import { NodeGraphDialogComponent } from './node-graph-dialog/node-graph-dialog.component';
import { NodesMenuComponent } from './nodes-menu/nodes-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    SearchPipePipe,
    NodeGraphDialogComponent,
    NodesMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2PaginationModule
  ],
  entryComponents: [NodeGraphDialogComponent],
  providers: [ApiService, HttpGetServiceService, GetNodeMoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
