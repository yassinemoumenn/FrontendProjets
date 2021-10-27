import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCertificateComponent } from './reject-certificate.component';

describe('RejectCertificateComponent', () => {
  let component: RejectCertificateComponent;
  let fixture: ComponentFixture<RejectCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
