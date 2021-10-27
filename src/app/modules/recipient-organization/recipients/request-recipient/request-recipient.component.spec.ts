import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRecipientComponent } from './request-recipient.component';

describe('RequestRecipientComponent', () => {
  let component: RequestRecipientComponent;
  let fixture: ComponentFixture<RequestRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
