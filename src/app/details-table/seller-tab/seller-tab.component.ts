import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-tab',
  templateUrl: './seller-tab.component.html',
  styleUrls: ['./seller-tab.component.css']
})
export class SellerTabComponent implements OnChanges {
  @Input() seller: {};

  current: number = 27;
  max: number = 50;
  stroke: number = 15;
  radius: number = 22;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;

  constructor() { }

  openTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
  }

  ngOnChanges() {
  }

  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform
    // console.log("length: ", this.seller['positiveFeedbackPercent'][0].length);
    // console.log("value: ", this.seller['positiveFeedbackPercent'][0]);
    if (this.seller['positiveFeedbackPercent'][0].length === 6) {
      transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(23%)';
    } else if (this.seller['positiveFeedbackPercent'][0].length === 5) {
      transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(32%)';
    } else if (this.seller['positiveFeedbackPercent'][0].length === 4) {
      transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(39%)';
    } else {
      transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(80%)';
    }

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': 11.5 + 'px'
    };
  }
}
