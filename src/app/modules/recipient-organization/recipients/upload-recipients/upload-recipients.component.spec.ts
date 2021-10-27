import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecipientsComponent } from './upload-recipients.component';

describe('UploadRecipientsComponent', () => {
  let component: UploadRecipientsComponent;
  let fixture: ComponentFixture<UploadRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
