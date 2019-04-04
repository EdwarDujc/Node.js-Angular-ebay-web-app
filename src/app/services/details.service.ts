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

  private subPhotos = new Subject();
  photos = this.subPhotos.asObservable();

  private detailJsonData: any;
  private detailSearchResults: any;

  private photoJsonData: any;
  private photoSearchResults: any;

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

        this.detailJsonData = data;
        console.log('details data: ', data);
        this.subDetails.next(this.detailJsonData);
        this.detailSearchResults = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  retrievePhotos(keyword) {
    const params = new HttpParams()
      .set('keyword', keyword);

    this.pService.setShowProgress(true);
    this.pService.setProgress(75);

    const response = this.http.get('http://localhost:8081/photos', { params });
    response.subscribe(
      data => {
        this.pService.setShowProgress(false);
        this.pService.setProgress(0);

        this.photoJsonData = data;
        // console.log('photo data in detail service: ', data);
        this.subPhotos.next(this.photoJsonData);
        this.photoSearchResults = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
