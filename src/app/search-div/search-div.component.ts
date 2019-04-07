import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {SearchForm} from './search_form';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {SearchService} from '../services/search.service';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-search-div',
  templateUrl: './search-div.component.html',
  styleUrls: ['./search-div.component.css']
})
export class SearchDivComponent implements OnInit {

  constructor(private myService: SearchService, cdRef: ChangeDetectorRef, private formBuilder: FormBuilder) {}
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
    'Art',
    'Baby',
    'Books',
    'Clothing, Shoes & Accessories',
    'Computers/Tablets & Networking',
    'Health & Beauty',
    'Music',
    'Video Games & Consoles'
  ];

  zipOptions = [];

  getHereZipcode() {
    this.myService.getHereZipcode().subscribe(data => {
      this.hereZipcode = data["zip"];
      this.form.hereZipcode = this.hereZipcode;
      this.gotZipcode = true;
    });
    // this.hereZipcode = '90007';
    // this.form.hereZipcode = this.hereZipcode;
    // this.gotZipcode = true;
    // console.log('this.hereZipcode: ', this.hereZipcode);
  }

  getZipcodeSuggestion(zip) {
    if (zip === '') {
      this.zipOptions = [];
      return;
    }
    this.myService.getZipcodeSuggestion(zip).subscribe(data => {
      // console.log(data);
      this.zipOptions = [];
      try {
        for (let z of data['postalCodes']) {
          this.zipOptions.push(z['postalCode']);
        }
      } catch (e) {
        // console.log(e);
      }
      // console.log('zipOptions:', this.zipOptions);
    });
  }

  ngOnInit() {
    this.getHereZipcode();
    // this.form.keyword = 'iphone'; //for test only
  }

  onSubmit() {
    this.myService.search(this.form);
  }

  clear() {
    // console.log('clear clicked in search-div.component.ts');
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
