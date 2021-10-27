import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientOrganizationComponent } from './recipient-organization.component';

describe('RecipientOrganizationComponent', () => {
  let component: RecipientOrganizationComponent;
  let fixture: ComponentFixture<RecipientOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
