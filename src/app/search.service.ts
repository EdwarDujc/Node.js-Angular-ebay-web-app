import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private jsonData: any;

  constructor(private http: HttpClient) { }

  getHereZipcode() {
    const url = "http://ip-api.com/json";
    return this.http.get(url)
  }

  search(form){
    console.log("submit clicked")
    let zipcode = form.userZipcode;
    let params = new HttpParams()
      .set("keyword", form.keyword)
      .set("category", form.category || "All Categories")
      .set("distance", form.distance || "10")
      .set("isUserInput", form.isUserInput || false)
      .set("zipcode", zipcode);

    let response = this.http.get("http://localhost:4200/", { params: params });

    response.subscribe(
      data => {
        this.jsonData = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  clear() {

  }

}
