import { Component, OnInit } from '@angular/core';
import { ProcessingBarService} from './processing-bar.service';
import { ProcessBar} from './processing-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-processing-bar',
  templateUrl: './processing-bar.component.html',
  styleUrls: ['./processing-bar.component.css']
})
export class ProcessingBarComponent implements OnInit {
  progressAriaValue;
  showProcessingBar = true;

  constructor(private pService: ProcessingBarService) {
    this.pService.progressObserve.subscribe( data => {
      this.progressAriaValue = data;
    });
  }

  ngOnInit() {
    this.pService.loadProgressValue();
  }
}
