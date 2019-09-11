import {enableProdMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatTableModule} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeListComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
