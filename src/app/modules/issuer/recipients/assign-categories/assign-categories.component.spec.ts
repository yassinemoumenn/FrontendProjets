import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCategoriesComponent } from './assign-categories.component';

describe('AssignCategoriesComponent', () => {
  let component: AssignCategoriesComponent;
  let fixture: ComponentFixture<AssignCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
