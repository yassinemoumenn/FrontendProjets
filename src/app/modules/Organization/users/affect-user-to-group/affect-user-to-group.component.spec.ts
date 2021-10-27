import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectUserToGroupComponent } from './affect-user-to-group.component';

describe('AffectUserToGroupComponent', () => {
  let component: AffectUserToGroupComponent;
  let fixture: ComponentFixture<AffectUserToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AffectUserToGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectUserToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
