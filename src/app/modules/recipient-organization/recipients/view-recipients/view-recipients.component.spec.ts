import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipientsComponent } from './view-recipients.component';

describe('ViewRecipientsComponent', () => {
  let component: ViewRecipientsComponent;
  let fixture: ComponentFixture<ViewRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
