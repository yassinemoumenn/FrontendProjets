import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecipientComponent } from './add-edit-recipient.component';

describe('AddEditRecipientComponent', () => {
  let component: AddEditRecipientComponent;
  let fixture: ComponentFixture<AddEditRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
