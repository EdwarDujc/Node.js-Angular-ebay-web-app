import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchDivComponent } from './search-div/search-div.component';
import { ResultsDivComponent } from './results-div/results-div.component';
import { SearchService } from './services/search.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CapToVarPipe } from './pipes/cap-to-var.pipe';
import { WhitespaceDirective } from './directives/whitespace.directive';
import { ZipcodeDirective } from './directives/zipcode.directive';
import { ResultsTableComponent } from './results-table/results-table.component';
import { DetailsTableComponent } from './details-table/details-table.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ProcessingBarComponent } from './processing-bar/processing-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchDivComponent,
    ResultsDivComponent,
    CapToVarPipe,
    WhitespaceDirective,
    ZipcodeDirective,
    ResultsTableComponent,
    DetailsTableComponent,
    FavoriteListComponent,
    ProcessingBarComponent
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
