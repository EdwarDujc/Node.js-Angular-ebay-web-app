import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SearchService} from '../services/search.service';
import { DetailsService} from '../services/details.service';
import { FavoriteService} from '../services/favorite.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  @Output() slide = new EventEmitter<any>();
  @Input() selectedId;

  inCartItems: any;
  detailButtonEnabled = false;
  showCart = false;

  constructor(
    private fService: FavoriteService,
    private dService: DetailsService,
    private sService: SearchService
  ) {
    this.fService.wishList.subscribe(data => {
      this.inCartItems = data;
      if (this.inCartItems.length > 0) {
        this.showCart = true;
      }
      else {
        this.showCart = false;
      }
    });
    this.sService.isClear.subscribe(data => {
      console.log(data);
    });
  }

  removeCart(item) {
    // console.log('item to remove: ', item);
    this.fService.removeCart(item['itemId']);
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

  ngOnInit() {
    this.fService.retrieveCart();
  }

}
