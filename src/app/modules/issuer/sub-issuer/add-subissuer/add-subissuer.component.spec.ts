import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubissuerComponent } from './add-subissuer.component';

describe('AddSubissuerComponent', () => {
  let component: AddSubissuerComponent;
  let fixture: ComponentFixture<AddSubissuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubissuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubissuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
