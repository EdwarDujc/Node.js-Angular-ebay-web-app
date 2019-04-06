import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-similar-tab',
  templateUrl: './similar-tab.component.html',
  styleUrls: ['./similar-tab.component.css']
})
export class SimilarTabComponent implements OnChanges {
  @Input() similar: {};
  items = [];

  keyTypes = ['Default', 'Product Name', 'Days Left', 'Price', 'Shipping Cost'];
  selectedKeyType = 'Default';

  OrderKey = 'id';
  orderKeyEnabled = false;

  orderTypes = ['Ascending', 'Descending'];
  selectedOrderType = 'Ascending';

  reverse = false;
  //show less by default
  showText = 'Show More';
  showMoreFlag = false;
  displayButtonFlag = false;
  showLimit = 5;

  constructor() { }

  setOrderType(deviceValue) {
    if (deviceValue === 'Ascending') {
      this.reverse = false;
    } else {
      this.reverse = true;
    }
    // console.log('setOrderType to ', deviceValue, this.reverse);
  }

  setKeyType(deviceValue) {
    switch (deviceValue) {
      case 'Default': {
        this.OrderKey = 'index';
        this.orderKeyEnabled = false;
        break;
      }
      case 'Product Name': {
        this.OrderKey = 'title';
        this.orderKeyEnabled = true;
        break;
      }
      case 'Days Left': {
        this.OrderKey = 'daysLeft';
        this.orderKeyEnabled = true;
        break;
      }
      case 'Price': {
        this.OrderKey = 'price';
        this.orderKeyEnabled = true;
        break;
      }
      case 'Shipping Cost': {
        this.OrderKey = 'shippingCost';
        this.orderKeyEnabled = true;
        break;
      }
    }
    // console.log('setKeyType to ', deviceValue, this.OrderKey);

  }

  openTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  changeMoreLess() {
    // change to show more after clicked
    if (this.showMoreFlag) {
      this.showMoreFlag = false;
      this.showText = 'Show Less';
      this.showLimit = this.items.length;
    } else {
    //  change to show less after clicked
      this.showMoreFlag = true;
      this.showText = 'Show More';
      this.showLimit = 5;
    }
  }

  ngOnChanges() {
    console.log('received similar: ', this.similar);
    try {
      this.items = [];
      let i = 0;
      for ( let item of this.similar['getSimilarItemsResponse']['itemRecommendations']['item']) {
        let tmpJson = {};
        tmpJson['index'] = i;
        i++;
        try {
          tmpJson['title'] = item['title'];
        } catch (e) {
          tmpJson['title'] = '';
        }
        try {
          tmpJson['viewItemURL'] = item['viewItemURL'];
        } catch (e) {
          tmpJson['viewItemURL'] = '';
        }
        try {
          tmpJson['price'] = +item['buyItNowPrice']['__value__'];
        } catch (e) {
          tmpJson['price'] = '';
        }
        try {
          tmpJson['shippingCost'] = +item['shippingCost']['__value__'];
        } catch (e) {
          tmpJson['shippingCost'] = '';
        }
        try {
          const timeLeftStr = item['timeLeft'];
          const pIndex = timeLeftStr.indexOf('P');
          const dIndex = timeLeftStr.indexOf('D');
          // console.log('timeLeftStr:', timeLeftStr);
          // console.log('pIndex:', pIndex);
          // console.log('dIndex:', dIndex);

          tmpJson['daysLeft'] = +timeLeftStr.slice(pIndex + 1, dIndex);

          // console.log('tmpJson.daysLeft:', tmpJson['daysLeft']);
        } catch (e) {
          // console.log(e);
          tmpJson['daysLeft'] = '';
        }
        try {
          tmpJson['image'] = item['imageURL'];
        } catch (e) {
          tmpJson['image'] = '';
        }
        this.items.push(tmpJson);
      }
      console.log('this.items: ', this.items);
    } catch (e) {
      this.items = [];
      this.displayButtonFlag = false;
      return;
    }
    if (this.items.length > 5) {
      this.displayButtonFlag = true;
    } else {
      this.displayButtonFlag = false;
    }
  }

}
