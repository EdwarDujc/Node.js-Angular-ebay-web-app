import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { DetailsService } from '../services/details.service';
import { FavoriteService } from '../services/favorite.service';
import { ProcessingBarService} from '../processing-bar/processing-bar.service';
import {catchError} from 'rxjs/operators';

// import {currentId} from 'async_hooks';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent implements OnInit {
  @Output() slide = new EventEmitter<any>();

  showResult = false;
  error = false;
  resultJson = null;
  showNoRecords = false;
  isFavorite: any;
  selectedId: any;
  detailButtonEnabled = false;

  currentPage = 1;
  totalPage = 0;
  pageIndexArray = [];

  buttonIndexClass = ['btn btn-dark', 'btn btn-light', 'btn btn-light', 'btn btn-light', 'btn btn-light'];

  constructor(private sService: SearchService,
              private dService: DetailsService,
              private fService: FavoriteService,
              private pService: ProcessingBarService) {
    this.sService.resultJson.subscribe(data => {
      // console.log('data.["findItemsAdvancedResponse"]: ', data['findItemsAdvancedResponse']);
      if (data === null || data === undefined) {
        this.error = true;
        this.showResult = false;
      } else if (data === 'clear') {
        this.showResult = false;
        this.resultJson = null;
        this.showNoRecords = false;
      } else if (data['findItemsAdvancedResponse'][0]['searchResult'][0]['@count'] === "0") {
        // console.log('zero item!');
        this.showResult = false;
        this.showNoRecords = true;
        this.resultJson = null;
      } else { // normally display results table
        const totalItems = +data['findItemsAdvancedResponse'][0]['searchResult'][0]['@count'];
        // console.log('data items count: ', totalItems);
        this.totalPage = totalItems / 10;
        // console.log('totalPage: ', this.totalPage);
        this.error = false;
        this.showResult = true;
        const items = data['findItemsAdvancedResponse'][0]['searchResult'][0]['item'];

        // filter search results
        this.resultJson = [];
        for (let i = 0; i < totalItems; i++) {
          let item = {};
          try {
            item['itemId'] = items[i]['itemId'][0];
          } catch {
            item['itemId'] = '0';
          }
          try {
            item['image'] = items[i]['galleryURL'];
          } catch {
            item['image'] = '';
          }
          try {
            let tmpTitle = items[i]['title'][0];
            item['full_title'] = tmpTitle;
            if (tmpTitle.length > 35) {
              let cutIndex = 34;
              while (cutIndex >= 0 && tmpTitle.charAt(cutIndex) !== ' ') {
                cutIndex--;
              }
              tmpTitle = tmpTitle.slice(0, cutIndex);
              tmpTitle += '...';
            }
            item['title'] = tmpTitle;
          } catch (err) {
            console.log('error:', err);
            item['title'] = 'N.A.';
            item['full_title'] = 'N.A.';
          }
          try {
            item['price'] = '$' + items[i]['sellingStatus'][0]['currentPrice'][0]['__value__'];
          } catch {
            item['price'] = 'N.A.';
          }
          try {
            if (items[i]['shippingInfo'][0]['shippingServiceCost'][0]['__value__'] === '0.0') {
              item['shipping'] = 'Free Shipping';
            }
            else {
              item['shipping'] = '$' + items[i]['shippingInfo'][0]['shippingServiceCost'][0]['__value__'];
            }
          } catch (err) {
            item['shipping'] = 'N.A.';
          }
          try {
            item['zip'] = items[i]['postalCode'];
          } catch {
            item['zip'] = 'N.A.';
          }
          try {
            item['seller'] = items[i]['sellerInfo'][0]['sellerUserName'][0];
          } catch {
            item['seller'] = 'N.A.';
          }
          try {
            item['shippinginfo'] = items[i]['shippingInfo'][0];
          } catch {
            item['shippinginfo'] = {};
          }
          try {
            item['returnsAccepted'] = items[i]['returnsAccepted'];
          } catch {
            item['returnsAccepted'] = '';
          }
          try {
            item['sellerInfo'] = items[i]['sellerInfo'];
          } catch {
            item['sellerInfo'] = '';
          }
          try {
            item['storeInfo'] = items[i]['storeInfo'];
            // console.log('storeInfo:', items[i]['storeInfo']);
          } catch {
            item['storeInfo'] = '';
          }

          this.resultJson.push(item);
        }

        this.showNoRecords = false;
        this.clearPages();
        for (let i = 0; i < this.totalPage; i++) {
          this.pageIndexArray.push(i + 1);
        }
        }
      // console.log('showNoRecords: ', this.showNoRecords);
      // console.log('showResult: ', this.showResult);
      // console.log('error: ', this.error);
      // console.log('data in results-table.component.ts: ', data);
    });
  }

  setFavorite(index) {
    console.log('to-implement: add item ', index, 'to wish list');
  }

  goDetailsPage() {
    // console.log('to implement: slide to Details page');
    this.slide.emit({ slide: 'left', item: this.selectedId });
  }

  getDetails(item) {
    this.detailButtonEnabled = true;
    this.slide.emit({ slide: 'left', item: item['itemId'] });
    this.selectedId = item['itemId'];
    this.dService.retrieveDetails(item['itemId']);
    this.dService.retrievePhotos(item['full_title']);
    this.dService.retrieveShippingInfo(item['shippinginfo'], item['returnsAccepted']);
    this.dService.retrieveSellerInfo(item);
    this.dService.retrieveSimilar(item['itemId']);
  }

  goPreviousPage() {
    this.currentPage -= 1;
    if (this.currentPage < 1) {
      this.currentPage += 5;
    }
    this.setButtonsClass();
    // console.log('current page: ', this.currentPage);
  }

  goNextPage() {
    this.currentPage += 1;
    if (this.currentPage > this.totalPage) {
      this.currentPage -= 5;
    }
    this.setButtonsClass();
    // console.log("current page: ", this.currentPage);
  }

  goToPage(index) {
    this.currentPage = index;
    this.setButtonsClass();
  }

  setButtonsClass() {
    for (let i = 0; i < this.totalPage; i++) {
      this.buttonIndexClass[i] = 'btn btn-light';
    }
    this.buttonIndexClass[this.currentPage - 1] = 'btn btn-dark';
  }

  clearPages() {
    this.pageIndexArray = [];
    this.currentPage = 1;
    this.setButtonsClass();
  }

  ngOnInit() {
    this.sService.loadSearchResult();
  }

}
