import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private jsonData: any;

  private subIsClear = new Subject();
  isClear = this.subIsClear.asObservable();

  private subIsDataGet = new Subject();
  isDataget = this.subIsDataGet.asObservable();

  private subResultJson = new Subject();
  resultJson = this.subResultJson.asObservable();

  private searchResults: any;

  constructor(private http: HttpClient) {}


  getHereZipcode() {
    const url = 'http://ip-api.com/json';
    return this.http.get(url);
  }

  search(form) {
    // console.log('submit clicked');
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

    const response = this.http.get('http://localhost:8081/process_get', { params });
    response.subscribe(
      data => {
        this.jsonData = data;
        // console.log(data);
        this.subIsDataGet.next(true);
        this.subResultJson.next(this.jsonData);
        this.searchResults = data["findItemsAdvancedResponse"];
      },
      err => {
        console.log(err);
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
