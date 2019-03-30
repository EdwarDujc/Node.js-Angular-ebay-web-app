import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private jsonData: any;

  constructor(private http: HttpClient) { }

  getHereZipcode() {
    const url = 'http://ip-api.com/json';
    return this.http.get(url);
  }

  search(form) {
    console.log('submit clicked');
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
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  clear() {

  }

}
