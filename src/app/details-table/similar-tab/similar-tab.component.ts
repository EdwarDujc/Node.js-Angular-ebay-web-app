import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-similar-tab',
  templateUrl: './similar-tab.component.html',
  styleUrls: ['./similar-tab.component.css']
})
export class SimilarTabComponent implements OnChanges {
  @Input() similar: {};

  constructor() { }

  ngOnChanges() {
  }

}
