import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {SearchForm} from './search_form';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search-div',
  templateUrl: './search-div.component.html',
  styleUrls: ['./search-div.component.css']
})
export class SearchDivComponent implements OnInit {

  constructor(private myService: SearchService, cdRef: ChangeDetectorRef) {
    // this.category = "All Categories";
  }
  userZipcode = '';
  hereZipcode = '';
  gotZipcode = false;
  category = 'all';
  conditionNew = false;
  conditionUsed = false;
  conditionUnspecified = false;
  shippingLocal = false;
  shippingFree = false;
  form = SearchForm;

  searchTypes = [
    'All Categories',
    'Baby',
    'Clothing, Shoes & Accessories',
    'Computers/Tablets & Networking',
    'Health & Beauty',
    'Music',
    'Video Games & Consoles'
  ];

  getHereZipcode() {
    this.myService.getHereZipcode().subscribe(data => {
      this.hereZipcode = data["zip"];
      this.form.hereZipcode = this.hereZipcode;
      this.gotZipcode = true;
      // console.log('this.hereZipcode: ', this.hereZipcode);
    });
  }

  ngOnInit() {
    this.getHereZipcode();
  }

  onSubmit() {
    this.myService.search(this.form);
  }

  clear() {
    this.myService.clear();
    this.category = 'all';
    this.conditionNew = false;
    this.conditionUsed = false;
    this.conditionUnspecified = false;
    this.shippingLocal = false;
    this.shippingFree = false;
    this.form.zipcodeCustom = false;
    this.userZipcode = '';
  }
}
