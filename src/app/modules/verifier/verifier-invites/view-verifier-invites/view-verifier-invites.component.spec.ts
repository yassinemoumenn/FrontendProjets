import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVerifierInvitesComponent } from './view-verifier-invites.component';

describe('ViewVerifierInvitesComponent', () => {
  let component: ViewVerifierInvitesComponent;
  let fixture: ComponentFixture<ViewVerifierInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVerifierInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVerifierInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
