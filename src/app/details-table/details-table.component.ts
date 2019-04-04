import { Component, OnInit, EventEmitter, Output, Input, NgZone } from '@angular/core';
import { SearchService } from '../services/search.service';
import { DetailsService } from '../services/details.service';
import { FavoriteService } from '../services/favorite.service';
import { ProcessingBarService} from '../processing-bar/processing-bar.service';
import {Title} from '@angular/platform-browser';
// import { Product } from './product-tab/product';

@Component({
  selector: 'app-details-table',
  templateUrl: './details-table.component.html',
  styleUrls: ['./details-table.component.css']
})
export class DetailsTableComponent implements OnInit {

  private tabs = [
    { id: 'product-tab', title: 'Product' },
    { id: 'photos-tab', title: 'Photos' },
    { id: 'shipping-tab', title: 'Shipping'},
    { id: 'seller-tab', title: 'Seller'},
    { id: 'similar-tab', title: 'Similar Products'}
  ];

  @Output() slide = new EventEmitter<string>();
  details: any;
  photos: any;
  showNoDetails = false;

  private currentTab = 'product-tab';

  // productJson: Product;
  productJson = {};
  photosJson = {};
  shippingJson = {};
  sellerJson = {};
  similarJson = {};


  setTab(tabId) {
    this.currentTab = tabId;
  }

  slideDetail() {
    this.slide.emit('right');
  }

  setFavorite() {
    console.log('to implement: favorite');
  }

  facebook() {
    console.log('to implement: facebook');
  }

  setProductTab(data) {
    let tmpJson = {};
    tmpJson['ack'] = 'success';
    let item = {}
    try {
      item = data['Item'];
    } catch (err) {
      console.log(err);
      console.log('no info found for this item');
      tmpJson['ack'] = 'failure';
      this.productJson = tmpJson;
      return;
    }
    try {
      tmpJson['productImgUrls'] = item['PictureURL'];
    } catch (err) {
      console.log(err);
      tmpJson['productImgUrls'] = false;
    }
    try {
      tmpJson['subtitle'] = item['Subtitle'];
    } catch (err) {
      console.log(err);
      tmpJson['subtitle'] = false;
    }
    try {
      tmpJson['price'] = '$'+item['CurrentPrice']['Value'];
    } catch (err) {
      console.log(err);
      tmpJson['price'] = false;
    }
    try {
      tmpJson['location'] = item['Location'];
    } catch (err) {
      console.log(err);
      tmpJson['location'] = false;
    }
    try {
      if (item['ReturnPolicy']['ReturnsAccepted'] === 'ReturnsNotAccepted') {
        tmpJson['returnPolicy'] = 'Returns Not Accepted';
      } else {
        tmpJson['returnPolicy'] = item['ReturnPolicy']['ReturnsAccepted'] + ' within ' + item['ReturnPolicy']['ReturnsWithin'];
      }
    } catch (err) {
      console.log(err);
      tmpJson['returnPolicy'] = 'Returns Not Accepted';
    }
    try {
      tmpJson['itemSpecifics'] = item['ItemSpecifics']['NameValueList'];
    } catch (err) {
      console.log(err);
      tmpJson['itemSpecifics'] = [];
    }
    this.productJson = tmpJson;
  }

  setImageTab(data) {
    let tmpJson = {};
    tmpJson['ack'] = 'success';
    try {
      tmpJson['items'] = data['items'];
      // console.log("data in setImageTab: ", data);
      // console.log("data[items] in setImageTab: ", data['items']);
    } catch (err) {
      console.log(err);
      tmpJson['items'] = [];
    }
    this.photosJson = tmpJson;
  }

  constructor(
    private dService: DetailsService,
    private fService: FavoriteService,
    private myZone: NgZone,
  ) {
    this.dService.details.subscribe(data =>{
      this.myZone.run(() => {
        this.details = data;
        this.setProductTab(data);
      });
    });
    this.dService.photos.subscribe(data =>{
      this.myZone.run(() => {
        this.photos = data;
        this.setImageTab(data);
      });
    });
  }

  ngOnInit() {
  }

}
