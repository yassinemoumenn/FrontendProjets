import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesComponent } from './certificates.component';

describe('ViewCertificatesComponent', () => {
  let component: CertificatesComponent;
  let fixture: ComponentFixture<CertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertificatesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
