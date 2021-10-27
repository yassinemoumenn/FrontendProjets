import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCertificatesComponent } from './listing-certificates.component';

describe('ListingCertificatesComponent', () => {
  let component: ListingCertificatesComponent;
  let fixture: ComponentFixture<ListingCertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCertificatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
