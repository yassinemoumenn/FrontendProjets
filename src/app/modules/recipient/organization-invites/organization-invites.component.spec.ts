import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationInvitesComponent } from './organization-invites.component';

describe('OrganizationInvitesComponent', () => {
  let component: OrganizationInvitesComponent;
  let fixture: ComponentFixture<OrganizationInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
