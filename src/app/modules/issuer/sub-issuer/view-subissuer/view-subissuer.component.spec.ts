import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubissuerComponent } from './view-subissuer.component';

describe('ViewSubissuerComponent', () => {
  let component: ViewSubissuerComponent;
  let fixture: ComponentFixture<ViewSubissuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubissuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubissuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
