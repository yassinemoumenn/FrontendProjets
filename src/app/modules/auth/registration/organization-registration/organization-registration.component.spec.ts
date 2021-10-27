import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRegistrationComponent } from './organization-registration.component';

describe('OrganizationRegistrationComponent', () => {
  let component: OrganizationRegistrationComponent;
  let fixture: ComponentFixture<OrganizationRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
