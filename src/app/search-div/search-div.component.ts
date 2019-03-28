import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {SearchForm} from "./search_form";
import { NgForm } from "@angular/forms/src/directives/ng_form";
import {SearchService} from "../search.service";

@Component({
  selector: 'app-search-div',
  templateUrl: './search-div.component.html',
  styleUrls: ['./search-div.component.css']
})
export class SearchDivComponent implements OnInit {
  userZipcode = '';
  gotZipcode: boolean = false;
  category = "all";
  condition_new: boolean = false;
  condition_used: boolean = false;
  condition_unspecified: boolean = false;
  shipping_local: boolean = false;
  shipping_free: boolean = false;
  form = SearchForm;

  constructor(private myService: SearchService, cdRef: ChangeDetectorRef) { }

  getHereZipcode(){
    this.myService.getHereZipcode().subscribe(data =>{
      this.userZipcode = data["zip"];
      this.form.userZipcode = this.userZipcode;
      this.gotZipcode = true;
      console.log(this.userZipcode)
    })
  }

  ngOnInit() {
    this.getHereZipcode();
  }

  onSubmit(){
    this.myService.search(this.form);
  }

  clear(){
    this.myService.clear();
    this.category = "All Categories";
    this.condition_new = false;
    this.condition_used = false;
    this.condition_unspecified = false;
    this.shipping_local = false;
    this.shipping_free = false;
    this.form.isUserInput = false;
  }

  searchTypes = [
    "All Categories",
    "Baby",
    "Clothing, Shoes & Accessories",
    "Computers/Tablets & Networking",
    "Health & Beauty",
    "Music",
    "Video Games & Consoles"
  ];
}
