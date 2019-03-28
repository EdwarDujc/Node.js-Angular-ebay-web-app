import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchDivComponent } from './search-div/search-div.component';
import { ResultsDivComponent } from './results-div/results-div.component';
import { SearchService } from "./search.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    SearchDivComponent,
    ResultsDivComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
