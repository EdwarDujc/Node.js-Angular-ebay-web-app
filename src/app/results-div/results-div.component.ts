import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { DetailsService } from '../services/details.service';
import { trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-results-div',
  templateUrl: './results-div.component.html',
  styleUrls: ['./results-div.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* => right', [
        style({right: '-100%'}),
        animate('.5s ease-in', style({right: 0}))
      ]),
      transition('* => left', [
        style({left: '-100%'}),
        animate('.5s ease-in', style({left: 0}))
      ]),
    ])
  ]
})
export class ResultsDivComponent implements OnInit {

  clear = false;
  isShowResult = true;
  isShowFavorite = false;
  resultShowClass = 'btn btn-dark';
  favoriteShowClass = 'btn btn-light';
  active: any;

  constructor(private sService: SearchService, private dService: DetailsService) {
    this.sService.isClear.subscribe(data => {
      this.showResult();
      this.isShowResult = false;
      this.clear = true;
    });
    this.sService.isDataget.subscribe(data => {
      this.showResult();
      this.isShowResult = true;
      this.clear = false;
    });
  }

  showResult() {
    this.clear = false;
    this.isShowFavorite = false;
    this.isShowResult = true;
    this.resultShowClass = 'btn btn-dark';
    this.favoriteShowClass = 'btn btn-light';
    this.active = 'right';
  }

  showFavorite() {
    this.clear = false;
    this.isShowResult = false;
    this.isShowFavorite = true;
    this.active = 'right';
    this.resultShowClass = 'btn btn-light';
    this.favoriteShowClass = 'btn btn-dark';
  }

  slideRight(panel) {
    this.clear = false;
    this.active = panel;
  }

  slideLeft(event) {
    this.clear = false;
    this.active = event.slide;
  }

  ngOnInit() {
  }

}
