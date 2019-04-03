import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ProcessingBarService} from '../processing-bar/processing-bar.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private subDetails = new Subject();
  details = this.subDetails.asObservable();
  private jsonData: any;
  private searchResults: any;

  constructor(private http: HttpClient, private pService: ProcessingBarService) { }

  retrieveDetails(itemId) {
    const params = new HttpParams()
      .set('itemId', itemId);

    this.pService.setShowProgress(true);
    this.pService.setProgress(75);

    const response = this.http.get('http://localhost:8081/details', { params });
    response.subscribe(
      data => {
        this.pService.setShowProgress(false);
        this.pService.setProgress(0);

        this.jsonData = data;
        console.log('details data: ', data);
        this.subDetails.next(this.jsonData);
        this.searchResults = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
