import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeCertificateComponent } from './revoke-certificate.component';

describe('RevokeCertificateComponent', () => {
  let component: RevokeCertificateComponent;
  let fixture: ComponentFixture<RevokeCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokeCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
