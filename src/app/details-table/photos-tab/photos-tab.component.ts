import { Component, OnInit, OnChanges, Input } from '@angular/core';


@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent implements OnChanges {
  @Input() photos: any;

  private displayWidth: number;
  private showphoto = true;

  private resized = false;
  private col1 = [];
  private col2 = [];
  private col3 = [];

  constructor() {}

  ngOnChanges() {
    console.log('photo data in photo-tab.ts: ', this.photos);
    try {
      this.displayWidth = window.screen.width;
      if (this.displayWidth > 600) {
        this.displayWidth = Math.round(this.displayWidth / 3);
      }
      this.col1.splice(0, this.col1.length);
      this.col2.splice(0, this.col2.length);
      this.col3.splice(0, this.col3.length);
      for (let i = 0; i < this.photos['items'].length; i++) {
        if (i === 0 || i === 3) {
          this.col1.push(this.photos['items'][i]['link']);
        } else if (i === 1 || i === 4 || i === 6) {
          this.col2.push(this.photos['items'][i]['link']);
        } else if (i === 2 || i === 5 || i === 7) {
          this.col3.push(this.photos['items'][i]['link']);
        } else {
          break;
        }
      }
    } catch (err) {
      console.log('catch error: ', err);
      this.photos = false;
      return;
    }
  }

}
