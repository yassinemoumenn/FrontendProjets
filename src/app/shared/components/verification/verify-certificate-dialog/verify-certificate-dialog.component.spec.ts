import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCertificateDialogComponent } from './verify-certificate-dialog.component';

describe('VerifyCertificateDialogComponent', () => {
  let component: VerifyCertificateDialogComponent;
  let fixture: ComponentFixture<VerifyCertificateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCertificateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCertificateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
