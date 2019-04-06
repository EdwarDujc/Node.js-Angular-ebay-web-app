import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  checkCart(itemIds) {
    let inCart = [];
    for (let id of itemIds) {
      inCart.push(false);
    }
    return inCart;
  }

  addCart(item) {

  }

  removeCart(itemId) {

  }

  constructor() { }
}
