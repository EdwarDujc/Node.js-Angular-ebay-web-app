import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessingBarService {
  private subProgress = new Subject();
  progressObserve = this.subProgress.asObservable();

  progressAriaValue = 0;

  constructor() {
  }

  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  setProgress(value) {
    this.progressAriaValue = value;
    this.subProgress.next(this.progressAriaValue);
  }

  loadProgressValue() {
    this.subProgress.next(this.progressAriaValue);
  }
}
