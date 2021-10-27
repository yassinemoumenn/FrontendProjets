import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingOrganizationsComponent } from './listing-organizations.component';

describe('ListingOrganizationsComponent', () => {
  let component: ListingOrganizationsComponent;
  let fixture: ComponentFixture<ListingOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
