import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Page } from 'src/app/models/helpers/Page';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { SignerModel } from '../../signer/Signer.model';
import { ValidationPhoneEmail } from '../recipients/validation-phone-email';
import { EmailValidator } from '../sub-issuer/email-validation';
import { SignerService } from './signer.service';

@Component({
  selector: 'app-signers',
  templateUrl: './signers.component.html',
  styleUrls: ['./signers.component.scss']
})
export class SignersComponent extends SmartComponent implements AfterViewInit {
  signers!: SignerModel[];

  @ViewChild('templateAddEdit') templateAddEdit: any;
  @ViewChild('exportData') templateExportData: any;
  signerFG: FormGroup = new FormGroup({});

  paginator: any;
  @ViewChild(PaginationComponent) paginatorGrandParent?: PaginationComponent;

  isLoading: boolean = false;
  resultsLength: number = -1;
  prevePageIndex: number = 10;
  cpt: number = 0;
  filter: string = '';
  search: string = '';

  dataSendToEditAddCompo: {
    action: string;
    data?: any;
    title: string;
  } = {
    action: '',
    data: undefined,
    title: ''
  };

  idsToDelete: number[] = [];

  exportTo: string = 'pdf';

  constructor(
    private dialog: MatDialog,
    private formbuilder: FormBuilder,
    private utilsService: UtilsService,
    private signerService: SignerService,
    private snackbarService: SnackbarService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.paginator = this.paginatorGrandParent?.paginator;
    this.FillSignersFromSource();
    this.InitFormGroup();
  }

  FillSignersFromSource = (filter?: string, search?: string) => {
    this.Page(filter, search).subscribe((data) => {
      this.signers = data.data.content;
      this.isLoading = false;
      this.resultsLength = data.data.totalElements;
    });
  };

  openDialogAdd = () => {
    this.dataSendToEditAddCompo = {
      action: 'add',
      data: undefined,
      title: 'Add New signer'
    };
    let dialogRef = this.dialog.open(this.templateAddEdit, {
      width: '70%',
      panelClass: ['padding-0']
    });
    dialogRef.afterClosed().subscribe(() => this.InitFormGroup());
  };

  openDialogToEdit = (e) => {
    if (e.data) {
      this.InitFormGroup(e.data);
      this.dataSendToEditAddCompo = {
        action: 'edit',
        data: e.data,
        title: 'Edit signer'
      };
      let dialogRef = this.dialog.open(this.templateAddEdit, {
        width: '70%',
        panelClass: ['bg-transparent', 'padding-0']
      });

      dialogRef.afterClosed().subscribe(() => this.InitFormGroup());
    }
  };

  openDialiogToDelete = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data?.id;
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'Cancel',
          confirmText: 'Confirm',
          message:
            'Do you really want to delete this Signer? This process cannot be undone.',
          title: 'Are you sure ?',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.deleteSigner(dialogRef);
    }
  };

  openDialiogToDeleteSelectedItems = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data;
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'Cancel',
          confirmText: 'Confirm',
          message:
            'Do you really want to delete these Signers? This process cannot be undone.',
          title: 'Are you sure ?',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.deleteSelectedSigners(dialogRef);
    }
  };

  openDialogToExportData = (exportTo: string) => {
    this.exportTo = exportTo;
    this.dialog.open(this.templateExportData, {
      width: '70%',
      panelClass: ['padding-0']
    });
  };

  applySearch = (search) => {
    this.search = search;
    this.signerService.cache = [];
    this.paginator.firstPage();
    this.FillSignersFromSource(this.filter, search);
  };

  addSigner = (e) => {
    this.signerService.addSigner(e.data).subscribe(
      (res) => {
        this.snackbarService.push({
          message: res.message,
          type: 'success'
        });
      },
      (err) => {
        this.dialog.closeAll();
        this.snackbarService.push({
          message: 'Add signer call in error:' + err.message,
          type: 'error'
        });
      },
      () => {
        this.signerService.cache = [];
        this.paginator.firstPage();
        this.FillSignersFromSource();
        this.dialog.closeAll();
      }
    );
  };

  editSigner = (e) => {
    this.signerService.updateSigner(e.id, e.data).subscribe(
      (res) => {
        this.snackbarService.push({
          message: res.message,
          type: 'success'
        });
      },
      (err) => {
        this.dialog.closeAll();
        this.snackbarService.push({
          message: 'Update signer call in error: ' + err.message,
          type: 'error'
        });
      },
      () => {
        this.signerService.cache = [];
        this.paginator.firstPage();
        this.FillSignersFromSource();
        this.dialog.closeAll();
      }
    );
  };

  deleteSigner = (dialogRef: any) => {
    dialogRef.afterClosed().subscribe((id) => {
      if (id !== undefined && id) {
        this.signerService.deleteSigner(id).subscribe(
          (res) => {
            this.snackbarService.push({
              message: res.message,
              type: 'success'
            });
          },
          (err) => {
            this.dialog.closeAll();
            this.snackbarService.push({
              message: 'Delete signer call in error: ' + err,
              type: 'error'
            });
          },
          () => {
            this.signerService.cache = [];
            this.paginator.firstPage();
            this.FillSignersFromSource();
            this.dialog.closeAll();
          }
        );
      }
    });
  };

  deleteSelectedSigners = (dialogRef: any) => {
    dialogRef.afterClosed().subscribe((id) => {
      if (id !== undefined && id) alert(`delete signers N: ${id}`);
    });
  };

  InitFormGroup = (data?: any): void => {
    this.signerFG = this.formbuilder.group(
      {
        firstname: [data?.firstname ?? '', [Validators.required]],
        lastname: [data?.lastname ?? '', [Validators.required]],
        email: [data?.email ?? '', [EmailValidator(this.utilsService)]],
        phone: [data?.phone ?? ''],
        password: '1234',
        birthday: [data?.birthday ?? '', [Validators.required]],
        occupation: [data?.occupation ?? '', [Validators.required]]
      },
      { validators: [ValidationPhoneEmail] }
    );
  };

  Page(filter?, search?): Observable<Page<SignerModel>> {
    this.cpt = 0;
    let pageSize = this.paginator.pageSize;
    let pageIndex = this.paginator.pageIndex;

    return this.paginator.page.pipe(
      startWith(0),
      switchMap((): any => {
        if (this.cpt === 0) {
          this.cpt++;
          this.isLoading = true;
          return this.signerService
            .getSigners(pageSize, pageIndex, filter, search)
            .pipe(catchError(() => of(null)));
        }
      }),
      map((data: ResponseObject<SignerModel[]>) => {
        return data.data;
      })
    );
  }

  OnPaginatonPaged = (e) => {
    if (this.prevePageIndex !== e.pageSize) {
      this.prevePageIndex = e.pageSize;
      e.firstPage();
      this.signerService.cache = [];
    }
    this.FillSignersFromSource(this.filter, this.search);
  };

  public get SIGNERS(): Observable<[]> {
    return of(this.signers) as Observable<[]>;
  }

  dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };
}
