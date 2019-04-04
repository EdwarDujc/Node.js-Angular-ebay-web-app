import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-shipping-tab',
  templateUrl: './shipping-tab.component.html',
  styleUrls: ['./shipping-tab.component.css']
})
export class ShippingTabComponent implements OnChanges {
  @Input() shipping: {};

  constructor() { }

  ngOnChanges() {
    // console.log('shipping: ', this.shipping);
  }

}
