import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullRecipientFieldsComponent } from './full-recipient-fields.component';

describe('FullRecipientFieldsComponent', () => {
  let component: FullRecipientFieldsComponent;
  let fixture: ComponentFixture<FullRecipientFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullRecipientFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullRecipientFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
