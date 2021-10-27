import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCertificateComponent } from './field-certificate.component';

describe('FieldCertificateComponent', () => {
  let component: FieldCertificateComponent;
  let fixture: ComponentFixture<FieldCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
