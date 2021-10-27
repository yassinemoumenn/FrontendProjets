import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierInvitesComponent } from './verifier-invites.component';

describe('VerifierInvitesComponent', () => {
  let component: VerifierInvitesComponent;
  let fixture: ComponentFixture<VerifierInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifierInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
