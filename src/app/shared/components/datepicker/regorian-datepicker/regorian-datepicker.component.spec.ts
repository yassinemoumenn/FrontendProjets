import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegorianDatepickerComponent } from './regorian-datepicker.component';

describe('RegorianDatepickerComponent', () => {
  let component: RegorianDatepickerComponent;
  let fixture: ComponentFixture<RegorianDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegorianDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegorianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
