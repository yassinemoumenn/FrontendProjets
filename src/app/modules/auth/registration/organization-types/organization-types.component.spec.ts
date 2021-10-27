import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTypesComponent } from './organization-types.component';

describe('OrganizationTypesComponent', () => {
  let component: OrganizationTypesComponent;
  let fixture: ComponentFixture<OrganizationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
