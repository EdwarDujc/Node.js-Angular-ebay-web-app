import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ProcessingBarService} from '../processing-bar/processing-bar.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = 'http://localhost:8081';

  private jsonData: any;

  private subIsClear = new Subject();
  isClear = this.subIsClear.asObservable();

  private subIsDataGet = new Subject();
  isDataget = this.subIsDataGet.asObservable();

  private subResultJson = new Subject();
  resultJson = this.subResultJson.asObservable();

  // private subZipSuggest = new Subject();
  // zipSuggestJson = this.zipSuggestJson.asObservable();

  private searchResults: any;

  constructor(private http: HttpClient, private pService: ProcessingBarService) {}


  getHereZipcode() {
    const url = 'http://ip-api.com/json';
    return this.http.get(url);
  }

  getZipcodeSuggestion(zip) {
    const params = new HttpParams().set('zipcode', zip);
    const response = this.http.get(this.url + '/zipcode', { params });
    return response;
  }

  search(form) {
    // console.log('submit clicked');
    this.clear();
    const zipcode = form.userZipcode;
    const params = new HttpParams()
      .set('keyword', form.keyword)
      .set('category', form.category || 'all_categories')
      .set('condition_new', form.condition_new || false)
      .set('condition_used', form.condition_used || false)
      .set('condition_unspecified', form.condition_unspecified || false)
      .set('shipping_local', form.shipping_local || false)
      .set('shipping_free', form.shipping_free || false)
      .set('distance', form.distance || '10')
      .set('zipcodeCustom', form.zipcodeCustom || false)
      .set('hereZipcode', form.hereZipcode)
      .set('userZipcode', form.userZipcode);

    this.pService.setShowProgress(true);
    this.pService.setProgress(75);

    const response = this.http.get(this.url + '/search', { params });
    response.subscribe(
      data => {
        this.pService.setShowProgress(false);
        this.pService.setProgress(0);

        this.jsonData = data;
        // console.log('search data: ', data);
        this.subIsDataGet.next(true);
        this.subResultJson.next(this.jsonData);
        this.searchResults = data['findItemsAdvancedResponse'];
      },
      err => {
        // console.log(err);
      }
    );
  }

  loadSearchResult() {
    this.subResultJson.next(this.jsonData);
  }

  clear() {
    // console.log('clear clicked in search.service.ts');
    this.subResultJson.next('clear');
    this.jsonData = undefined;
    this.subIsClear.next(true);
  }

}
