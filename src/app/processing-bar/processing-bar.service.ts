import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingBarService {
  private subProgress = new Subject();
  progressObserve = this.subProgress.asObservable();

  private subShowProcessingbar = new Subject();
  showProcessingObserve = this.subShowProcessingbar.asObservable();

  progressAriaValue = 0;
  showProcessingBar = false;

  constructor() {
  }

  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  setProgress(value) {
    this.progressAriaValue = value;
    // console.log(value)
    this.subProgress.next(this.progressAriaValue);
  }

  setShowProgress(flag) {
    // console.log(flag)
    this.showProcessingBar = flag;
    this.subShowProcessingbar.next(this.showProcessingBar);
  }

  loadProgressValue() {
    this.subProgress.next(this.progressAriaValue);
    this.subShowProcessingbar.next(this.showProcessingBar);
  }
}
