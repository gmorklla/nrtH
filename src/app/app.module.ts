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
import { ApiService } from './api.service';
import { HttpGetServiceService } from './shared/services/http-get-service.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import 'hammerjs';
import { SearchPipePipe } from './search-pipe.pipe';
import { NodeGraphDialogComponent } from './node-graph-dialog/node-graph-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    SearchPipePipe,
    NodeGraphDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    Ng2PaginationModule
  ],
  entryComponents: [NodeGraphDialogComponent],
  providers: [ApiService, HttpGetServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
