import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDesignsComponent } from './listing-designs.component';

describe('ListingDesignsComponent', () => {
  let component: ListingDesignsComponent;
  let fixture: ComponentFixture<ListingDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingDesignsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
