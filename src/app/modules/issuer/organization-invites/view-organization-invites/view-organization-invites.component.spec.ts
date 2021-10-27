import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizationInvitesComponent } from './view-organization-invites.component';

describe('ViewOrganizationInvitesComponent', () => {
  let component: ViewOrganizationInvitesComponent;
  let fixture: ComponentFixture<ViewOrganizationInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrganizationInvitesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganizationInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
