import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteRecipientsComponent } from './invite-recipients.component';

describe('InviteRecipientsComponent', () => {
  let component: InviteRecipientsComponent;
  let fixture: ComponentFixture<InviteRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
