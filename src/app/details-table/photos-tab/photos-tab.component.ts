import { Component, OnInit, OnChanges, Input } from '@angular/core';


@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent implements OnChanges {
  @Input() photos: {};

  constructor() {}

  ngOnChanges() {
  }

}
