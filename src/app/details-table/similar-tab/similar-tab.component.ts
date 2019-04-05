import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-similar-tab',
  templateUrl: './similar-tab.component.html',
  styleUrls: ['./similar-tab.component.css']
})
export class SimilarTabComponent implements OnChanges {
  @Input() similar: {};

  // keyTypes = ['Default', 'Product Name', 'Days Left', 'Price', 'Shipping Cost'];
  // selectedKeyType = 'Default';

  keyTypes = ['id', 'name', 'genre'];
  selectedKeyType = 'id';


  orderTypes = ['Ascending', 'Descending'];
  selectedOrderType = 'Ascending';

  reverse: false;

  // -----------------------------------------------------------
  games = [
    {
      "id":"1",
      "name": "DOTA 2",
      "genre": "Strategy"
    },
    {
      "id":"2",
      "name": "AOE 3",
      "genre": "Strategy"
    },
    {
      "id":"3",
      "name": "GTA 5",
      "genre": "RPG"
    },
    {
      "id":"4",
      "name": "Far Cry 3",
      "genre": "Action"
    },
    {
      "id":"5",
      "name": "GTA San Andreas",
      "genre": "RPG"
    },
    {
      "id":"6",
      "name": "Hitman",
      "genre": "Action"
    },
    {
      "id":"7",
      "name": "NFS MW",
      "genre": "Sport"
    },{
      "id":"8",
      "name": "Fifa 16",
      "genre": "Sport"
    },{
      "id":"9",
      "name": "NFS Sen 2",
      "genre": "Sport"
    },{
      "id":"10",
      "name": "Witcher Assasins on King",
      "genre": "Adventure"
    }
  ]
  // -----------------------------------------------------------


  constructor() { }

  setOrderType(deviceValue) {
    if (deviceValue === 'Ascending') {
      this.reverse = false;
    } else {
      this.reverse = true;
    }
    console.log('setOrderType to ', deviceValue, this.reverse);
  }

  ngOnChanges() {
    console.log('similar: ', this.similar);
  }

}

// setKeyDefault() {}
// setKeyProductName() {}
// setKeyDays() {}
// setKeyPrice() {}
// setKeyShippingCost() {}
//
// setKeyType(i) {
//   this.selectedKeyType = i;
//   console.log('seletedKeyType: ', this.selectedKeyType);
//   switch (i) {
//     case 0: {
//       this.setKeyDefault();
//       return;
//     }
//     case 1: {
//       this.setKeyProductName();
//       return;
//     }
//     case 2: {
//       this.setKeyDays();
//       return;
//     }
//     case 3: {
//       this.setKeyPrice();
//       return;
//     }
//     case 4: {
//       this.setKeyShippingCost();
//     }
//   }
// }
