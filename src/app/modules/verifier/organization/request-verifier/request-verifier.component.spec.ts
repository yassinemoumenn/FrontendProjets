import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVerifierComponent } from './request-verifier.component';

describe('RequestVerifierComponent', () => {
  let component: RequestVerifierComponent;
  let fixture: ComponentFixture<RequestVerifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestVerifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
