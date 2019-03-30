import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchDivComponent } from './search-div/search-div.component';
import { ResultsDivComponent } from './results-div/results-div.component';
import { SearchService } from "./search.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CapToVarPipe } from "./pipes/cap-to-var.pipe";

@NgModule({
  declarations: [
    AppComponent,
    SearchDivComponent,
    ResultsDivComponent,
    CapToVarPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
