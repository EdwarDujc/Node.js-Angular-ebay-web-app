// module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
// component
import { AppComponent } from './app.component';
import { SearchDivComponent } from './search-div/search-div.component';
import { ResultsDivComponent } from './results-div/results-div.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { DetailsTableComponent } from './details-table/details-table.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
// service
import { SearchService } from './services/search.service';
import { FavoriteService } from './services/favorite.service';
import { DetailsService } from './services/details.service';
import { ProcessingBarService} from './processing-bar/processing-bar.service';
// pipe
import { CapToVarPipe } from './pipes/cap-to-var.pipe';
// directive
import { WhitespaceDirective } from './directives/whitespace.directive';
import { ZipcodeDirective } from './directives/zipcode.directive';
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatTooltipModule
  ],
  providers: [
    SearchService,
    FavoriteService,
    DetailsService,
    ProcessingBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
