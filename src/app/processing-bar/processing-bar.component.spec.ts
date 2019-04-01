import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingBarComponent } from './processing-bar.component';

describe('ProcessingBarComponent', () => {
  let component: ProcessingBarComponent;
  let fixture: ComponentFixture<ProcessingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
