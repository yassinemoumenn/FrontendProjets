import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Errors404Component } from './404.component';

describe('Errors404Component', () => {
  let component: Errors404Component;
  let fixture: ComponentFixture<Errors404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Errors404Component]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Errors404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
