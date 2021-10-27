import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOrganizationComponent } from './request-organization.component';

describe('RequestOrganizationComponent', () => {
  let component: RequestOrganizationComponent;
  let fixture: ComponentFixture<RequestOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
