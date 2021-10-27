import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { AddDesignComponent } from './add-design.component';

describe('AddDesignComponent', () => {
  let component: AddDesignComponent;
  let fixture: ComponentFixture<AddDesignComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({});
    const confirmDialogServiceStub = () => ({
      open: (options) => ({}),
      confirmed: () => ({ subscribe: (f) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddDesignComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: ConfirmDialogService, useFactory: confirmDialogServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AddDesignComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`checked has default value`, () => {
    expect(component.checked).toEqual(false);
  });

  it(`isDoubleSlide has default value`, () => {
    expect(component.isDoubleSlide).toEqual(true);
  });

  it(`isChecked has default value`, () => {
    expect(component.isChecked).toEqual(true);
  });

  it(`shapes has default value`, () => {
    expect(component.shapes).toEqual([`Custom`, `Card`, `Badge`, `Letter`]);
  });

  it(`signers has default value`, () => {
    expect(component.signers).toEqual([, ,]);
  });

  it(`allCategories has default value`, () => {
    expect(component.allCategories).toEqual([,]);
  });

  it(`issuerFields has default value`, () => {
    expect(component.issuerFields).toEqual([
      `%firstName`,
      `%lastName`,
      `%nameOrganism`,
      `%email`,
      `%phone`,
      `%role`,
      `%address`,
      `%birthday`,
      `%signature`,
      `%logo`,
      `%position`
    ]);
  });

  describe('confirmdialogv1', () => {
    it('makes expected calls', () => {
      const confirmDialogServiceStub: ConfirmDialogService =
        fixture.debugElement.injector.get(ConfirmDialogService);
      spyOn(confirmDialogServiceStub, 'open').and.callThrough();
      spyOn(confirmDialogServiceStub, 'confirmed').and.callThrough();
      component.confirmdialogv1();
      expect(confirmDialogServiceStub.open).toHaveBeenCalled();
      expect(confirmDialogServiceStub.confirmed).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'DragModeOn').and.callThrough();
      spyOn(component, 'DragModeOff').and.callThrough();
      spyOn(component, 'confirmdialogv1').and.callThrough();
      component.ngOnInit();
      expect(component.DragModeOn).toHaveBeenCalled();
      expect(component.DragModeOff).toHaveBeenCalled();
      expect(component.confirmdialogv1).toHaveBeenCalled();
    });
  });
});
