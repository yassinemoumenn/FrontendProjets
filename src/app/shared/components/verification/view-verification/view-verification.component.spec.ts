import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVerificationComponent } from './view-verification.component';

describe('ViewVerificationComponent', () => {
  let component: ViewVerificationComponent;
  let fixture: ComponentFixture<ViewVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
