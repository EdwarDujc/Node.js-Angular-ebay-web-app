// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// component
import { AppComponent } from './app.component';
import { SearchDivComponent } from './search-div/search-div.component';
import { ResultsDivComponent } from './results-div/results-div.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { DetailsTableComponent } from './details-table/details-table.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ProcessingBarComponent } from './processing-bar/processing-bar.component';
// service
import { SearchService } from './services/search.service';
import { FavoriteService } from './services/favorite.service';
import { DetailsService } from './services/details.service';
// pipe
import { CapToVarPipe } from './pipes/cap-to-var.pipe';
// directive
import { WhitespaceDirective } from './directives/whitespace.directive';
import { ZipcodeDirective } from './directives/zipcode.directive';




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
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    SearchService,
    FavoriteService,
    DetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
