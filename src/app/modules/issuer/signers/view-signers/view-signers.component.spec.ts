import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignersComponent } from './view-signers.component';

describe('ViewSignersComponent', () => {
  let component: ViewSignersComponent;
  let fixture: ComponentFixture<ViewSignersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSignersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
