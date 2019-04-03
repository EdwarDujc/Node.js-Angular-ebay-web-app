import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-tab',
  templateUrl: './seller-tab.component.html',
  styleUrls: ['./seller-tab.component.css']
})
export class SellerTabComponent implements OnChanges {
  @Input() seller: {};

  constructor() { }

  ngOnChanges() {
  }

}
