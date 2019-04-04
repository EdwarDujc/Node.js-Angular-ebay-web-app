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

  private subShipping = new Subject();
  shipping = this.subShipping.asObservable();

  private subSeller = new Subject();
  seller = this.subSeller.asObservable();

  private detailJsonData: any;
  private detailSearchResults: any;

  private photoJsonData: any;
  private photoSearchResults: any;

  private shippingJsonData: any;
  private shippingSearchResults: any;

  private sellerJsonData: any;
  private sellerSearchResults: any;

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
        // console.log('details data: ', data);
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

  retrieveShippingInfo(shippingInfo, returnsAccepted) {
    const tmpJson = {};
    tmpJson['shippingInfo'] = {};
    try {
      tmpJson['returnsAccepted'] = returnsAccepted[0];
    } catch (e) {
      tmpJson['returnsAccepted'] = '';
    }
    // console.log('shippingInfo: ', shippingInfo);
    try {
      if (shippingInfo['shippingServiceCost'][0]['__value__'] === '0.0') {
        tmpJson['shippingInfo']['shippingCost'] = 'Free Shipping';
      } else {
        tmpJson['shippingInfo']['shippingCost'] = '$' + shippingInfo['shippingServiceCost'][0]['__value__'];
      }
    } catch (err) {
      console.log(err);
      tmpJson['shippingInfo']['shippingCost'] = false;
    }
    try {
      tmpJson['shippingInfo']['shippingLocation'] = shippingInfo['shipToLocations'][0];
    } catch (err) {
      console.log(err);
      tmpJson['shippingInfo']['shippingLocation'] = false;
    }
    try {
      if (shippingInfo['handlingTime'][0] === '0' || shippingInfo['handlingTime'][0] === '1') {
        tmpJson['shippingInfo']['handlingTime'] = shippingInfo['handlingTime'][0] + ' Day';
      } else {
        tmpJson['shippingInfo']['handlingTime'] = shippingInfo['handlingTime'][0] + ' Days';
      }
    } catch (err) {
      console.log(err);
      tmpJson['shippingInfo']['handlingTime'] = false;
    }
    try {
      tmpJson['shippingInfo']['expeditedShipping'] = shippingInfo['expeditedShipping'][0];
    } catch (err) {
      console.log(err);
      tmpJson['shippingInfo']['expeditedShipping'] = '';
    }
    try {
      tmpJson['shippingInfo']['oneDayShippingAvailable'] = shippingInfo['oneDayShippingAvailable'][0];
    } catch (err) {
      console.log(err);
      tmpJson['shippingInfo']['oneDayShippingAvailable'] = '';
    }
    // console.log('tmpjson: ', tmpJson);
    this.shippingJsonData = tmpJson;
    this.subShipping.next(this.shippingJsonData);
    this.shippingSearchResults = tmpJson;
  }

  retrieveSellerInfo(sellerInfo) {
    const tmpJson = {};
    try {
      tmpJson['feedbackScore'] = sellerInfo[0]['feedbackScore'];
    } catch (e) {
      console.log(e);
      tmpJson['feedbackScore'] = '';
    }


    this.sellerJsonData = tmpJson;
    this.subSeller.next(this.sellerJsonData);
    this.sellerSearchResults = tmpJson;
  }
}
