import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsDivComponent } from './results-div.component';

describe('ResultsDivComponent', () => {
  let component: ResultsDivComponent;
  let fixture: ComponentFixture<ResultsDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
