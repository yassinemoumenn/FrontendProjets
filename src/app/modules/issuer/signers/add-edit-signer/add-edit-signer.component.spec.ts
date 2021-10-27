import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSignerComponent } from './add-edit-signer.component';

describe('AddEditSignerComponent', () => {
  let component: AddEditSignerComponent;
  let fixture: ComponentFixture<AddEditSignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditSignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
