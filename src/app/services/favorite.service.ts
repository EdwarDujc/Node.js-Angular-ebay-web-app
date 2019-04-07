import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private subWishList = new Subject();
  wishList = this.subWishList.asObservable();

  private subWishListChange = new Subject();
  wishListChange = this.subWishListChange.asObservable();

  checkCart(itemIds) {
    let inCart = [];
    for (let id of itemIds) {
      if (!localStorage.getItem(id)) {
        inCart.push(false);
      } else {
        inCart.push(true);
      }
    }
    return inCart;
  }

  addCart(item) {
    // console.log('item to add: ', item);
    localStorage.setItem(item['itemId'], JSON.stringify(item));
    this.retrieveCart();
  }

  removeCart(itemId) {
    //  clear all, for test only!!!!!!!!
    // for (let i = 0; i < localStorage.length; i++) {
    //   localStorage.removeItem(localStorage.key(i));
    // }
    // this.retrieveCart();

    localStorage.removeItem(itemId);
    this.retrieveCart();
  }

  retrieveCart() {
    const localStroageItems = new Array(localStorage.length);
    for (let i = 0; i < localStroageItems.length; i++) {
      localStroageItems[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    };
    this.subWishList.next(localStroageItems);
    this.subWishListChange.next(true);
  }

  constructor() {
  }
}
