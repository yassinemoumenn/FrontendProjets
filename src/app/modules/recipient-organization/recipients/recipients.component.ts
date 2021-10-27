import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Page } from 'src/app/models/helpers/Page';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { GroupModel } from 'src/app/models/Organization';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { CategoryModel } from '../../issuer/category/Category.model';
import { RecipientsService } from '../../issuer/recipients/recipients.service';
import { ValidationPhoneEmail } from '../../issuer/recipients/validation-phone-email';
import { EmailValidator } from '../../issuer/sub-issuer/email-validation';
import { RecipientModel } from '../../recipient/Recipient.model';
import { RecipientService } from './recipient.service';
import { ValidateUsername } from './validate-username';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent
  extends SmartComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  recipients: RecipientModel[] = [];
  paginator: any;

  recipientRequests: any[] = [];

  @ViewChild(PaginationComponent)
  paginatorGrandParent?: PaginationComponent;

  paginatorRequests: any;
  @ViewChild('PaginationComponent2')
  paginatorGrandParent2?: PaginationComponent;

  isLoading: boolean = false;
  isLoadingRequests: boolean = false;
  resultsLength: number = 1;
  resultsLengthRequest: number = 0;
  prevePageIndex: number = 10;
  cpt: number = 0;
  search: string = '';
  searchRequests: string = '';

  @ViewChild('templateAsssignCategories') templateAsssignCategories: any;
  @ViewChild('templateAddEdit') templateAddEdit: any;
  @ViewChild('exportData') templateExportData: any;
  @ViewChild('templateInviteRecipients') templateInviteRecipients: any;
  @ViewChild('templateSendCredentials') templateSendCredentials: any;
  @ViewChild('templateRecipientRequest') templateRecipientRequest: any;
  @ViewChild('templateFullRecipientsFields') templateFullRecipientsFields: any;

  recipientFG!: FormGroup;

  categories!: CategoryModel[];
  organizations$: Observable<any> = of([]);
  grousps: GroupModel[] = [];

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

  recipientIDsToAssignCatCompo: string[] = [];

  category$!: Observable<ResponseObject<CategoryModel[]>>;

  subscriptions: Subscription[] = [];

  exportTo: string = 'pdf';

  recipientToSendCredentials: any;
  action: string = 'added';

  private unsubscribe: Subscription[] = [];

  recipientsSendToInvite!: Observable<Page<RecipientModel>>;

  recipientDataToFull: any;

  constructor(
    private recipientSer: RecipientService,
    private recipientServiceIssuer: RecipientsService,
    private dialog: MatDialog,
    private formbuilder: FormBuilder,
    private utilsService: UtilsService,
    private snackbarService: SnackbarService
  ) {
    super();
  }
  ngOnInit(): void {
    this.FillRecipientsFromSource();
  }
  ngAfterViewInit(): void {
    this.paginator = this.paginatorGrandParent?.paginator;
    this.FillCategoriesFromSource();
    this.FillOrganizationsFromSource();
    this.FillRecipientsRequestsFromSource();
    this.InitFormGroup();
  }

  FillRecipientsFromSource = (search?: string) => {
    let subs = this.Page(search).subscribe((data) => {
      this.isLoading = false;
      this.recipients = data.data.content;
      this.resultsLength = data.data.totalElements;
    });
    this.subscriptions.push(subs);
  };

  FillCategoriesFromSource = () => {
    this.category$ = this.recipientSer.GetCategories(undefined).pipe(
      map((resp) => {
        return resp;
      })
    );
    let subs = this.category$.subscribe(
      (res) => {
        this.categories = res.data;
      },
      (err) => {
        this.snackbarService.push({
          message: err.message,
          type: 'error'
        });
      }
    );
    this.subscriptions.push(subs);
  };

  categoriesSubject!: Observable<ResponseObject<CategoryModel[]>>;
  GetCategoriesByGroup = (grpID) => {
    this.categoriesSubject = this.recipientSer.GetCategories(grpID);
  };

  FillOrganizationsFromSource = () => {
    this.organizations$ = this.recipientSer.GetOrganizations();
  };

  FillRecipientsRequestsFromSource = (search?: string) => {
    let subscAllRecipients = this.Page(search, 'request').subscribe((data) => {
      let _data: any = data as any;
      this.isLoadingRequests = false;
      this.recipientRequests = _data.data;
      this.resultsLengthRequest = _data.data.length;
      if (this.resultsLengthRequest === 0) this.dialog.closeAll();
    });
    this.unsubscribe.push(subscAllRecipients);
  };

  FillAllUsers = (search?) => {
    this.recipientsSendToInvite = this.recipientSer.SearchRecipient(search);
  };

  applySearch = (search) => {
    this.search = search;
    this.recipientSer.cache = [];
    this.FillRecipientsFromSource(search);
  };

  OpenDialogAdd = () => {
    this.dataSendToEditAddCompo = {
      action: 'add',
      data: undefined,
      title: 'RECIPIENTORGANIZATION.BODY.AddEditRecipient.TitleAdd'
    };
    let dialogRef = this.dialog.open(this.templateAddEdit, {
      width: '70%',
      panelClass: ['padding-0', 'custom-overflow']
    });
    let subs = dialogRef.afterClosed().subscribe(() => this.InitFormGroup());
    this.subscriptions.push(subs);
  };

  OpenDialogToEdit = (e) => {
    if (e.data) {
      this.InitFormGroup(e.data);
      this.recipientFG.removeControl('username');
      this.dataSendToEditAddCompo = {
        action: 'edit',
        data: e.data,
        title: 'RECIPIENTORGANIZATION.BODY.AddEditRecipient.TitleEdit'
      };
      let dialogRef = this.dialog.open(this.templateAddEdit, {
        width: '70%',
        panelClass: ['bg-transparent', 'padding-0']
      });

      let subs = dialogRef.afterClosed().subscribe(() => this.InitFormGroup());
      this.subscriptions.push(subs);
    }
  };

  OpenDialiogToDelete = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data?.id;
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'RECIPIENTORGANIZATION.BODY.ViewRecipients.CancelButton',
          confirmText:
            'RECIPIENTORGANIZATION.BODY.ViewRecipients.ConfirmButton',
          message: 'RECIPIENTORGANIZATION.BODY.ViewRecipients.MsgConfirmDelete',
          title: 'RECIPIENTORGANIZATION.BODY.ViewRecipients.ConfirmDelete',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.DeleteRecipient(dialogRef);
    }
  };

  OpenDialiogToDeleteSelectedItems = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data.map((obj) => obj.id);
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'RECIPIENTORGANIZATION.BODY.ViewRecipients.CancelButton',
          confirmText:
            'RECIPIENTORGANIZATION.BODY.ViewRecipients.ConfirmButton',
          message:
            'RECIPIENTORGANIZATION.BODY.ViewRecipients.MsgConfirmDeleteMulti',
          title: 'RECIPIENTORGANIZATION.BODY.ViewRecipients.ConfirmDelete',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.DeleteSelectedRecipients(dialogRef);
    }
  };

  OpenDialiogToAssignCategory = (e) => {
    this.recipientIDsToAssignCatCompo = e.data.map((recip) => recip.id);
    this.dialog.open(this.templateAsssignCategories, {
      width: '70%',
      minHeight: '70%',
      panelClass: ['padding-0']
    });
  };

  categoriesToUpload!: Observable<CategoryModel[]>;
  openUploadDialog(uploadContent) {
    this.categoriesToUpload = of(this.categories);
    this.dialog.open(uploadContent, {
      width: '70%'
    });
  }

  openDialogToExportData = (exportTo: string) => {
    this.exportTo = exportTo;
    this.dialog.open(this.templateExportData, {
      width: '70%',
      panelClass: ['padding-0']
    });
  };

  OpenDialogToInviteRecipients = () => {
    this.FillAllUsers();

    let dialogRef = this.dialog.open(this.templateInviteRecipients, {
      width: '70%',
      minHeight: '70%',
      panelClass: ['padding-0', 'custom-overflow']
    });
  };

  dialogSendCredentials!: MatDialogRef<any>;
  OpenDialogToSendCredentials = () => {
    this.dialogSendCredentials = this.dialog.open(
      this.templateSendCredentials,
      {
        width: '50%',
        panelClass: ['padding-0', 'custom-overflow']
      }
    );
  };

  OpenDialogRequests = () => {
    let dialogRef = this.dialog.open(this.templateRecipientRequest, {
      width: '70%',
      height: '71%',
      panelClass: ['padding-0', 'custom-overflow']
    });
    let subs1 = dialogRef.afterOpened().subscribe(() => {
      this.paginatorRequests = this.paginatorGrandParent2?.paginator;
      this.FillRecipientsRequestsFromSource();
    });
    let subs2 = dialogRef.afterClosed().subscribe(() => {
      this.recipientSer.cache = [];
      this.paginator.firstPage();
      this.FillRecipientsFromSource();
    });
    this.subscriptions.push(subs1);
    this.subscriptions.push(subs2);
  };

  OpenDialogToFullRecipientFields = (e) => {
    this.recipientDataToFull = e;
    let dialogRef = this.dialog.open(this.templateFullRecipientsFields, {
      width: '70%'
    });
  };

  eventsSubject: Subject<boolean> = new Subject<boolean>();
  DeleteSelectedRecipients = (dialogRef: any) => {
    dialogRef.afterClosed().subscribe((ids) => {
      if (ids !== undefined && ids) {
        from(ids)
          .pipe(concatMap((id) => this.recipientSer.DeleteRecipient(id)))
          .subscribe(
            (res) => {
              this.snackbarService.push({
                message:
                  'RECIPIENTORGANIZATION.BODY.ViewRecipients.MsgDeleteSuccessMulti',
                type: 'success'
              });
            },
            (err) => {
              this.snackbarService.push({
                message: err.message,
                type: 'error'
              });
            },
            () => {
              this.eventsSubject.next(true);
              this.recipientSer.cache = [];
              this.paginator.firstPage();
              this.FillRecipientsFromSource();
              this.dialog.closeAll();
            }
          );
      }
    });
  };

  DeleteRecipient = (dialogRef: any) => {
    let subs = dialogRef.afterClosed().subscribe((id) => {
      if (id !== undefined && id) {
        this.recipientSer.DeleteRecipient(id).subscribe(
          (res) => {
            this.snackbarService.push({
              message:
                'RECIPIENTORGANIZATION.BODY.ViewRecipients.MsgDeleteSuccess',
              type: 'success'
            });
          },
          (err) => {
            this.snackbarService.push({
              message: err.message,
              type: 'error'
            });
          },
          () => {
            this.recipientSer.cache = [];
            this.paginator.firstPage();
            this.FillRecipientsFromSource();
            this.dialog.closeAll();
          }
        );
      }
    });
    this.subscriptions.push(subs);
  };

  AddRecipient = (recipient: RecipientModel) => {
    this.OpenDialogToSendCredentials();
    this.dialogSendCredentials.afterClosed().subscribe((data) => {
      this.recipientSer.CreateRecipient(recipient, data.checked).subscribe(
        (res) => {
          this.snackbarService.push({
            message: 'RECIPIENTORGANIZATION.BODY.AddEditRecipient.MsgSuccess',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
          this.recipientSer.cache = [];
          this.paginator.firstPage();
          this.FillRecipientsFromSource();
          this.dialog.closeAll();
        },
        () => {
          this.recipientSer.cache = [];
          this.paginator.firstPage();
          this.FillRecipientsFromSource();
          this.dialog.closeAll();
        }
      );
    });
  };

  EditRecipient = (e) => {
    this.recipientSer.UpdateRecipient(e.id, e.data).subscribe(
      (res) => {
        this.snackbarService.push({
          message: 'RECIPIENTORGANIZATION.BODY.AddEditRecipient.MsgEditSuccess',
          type: 'success'
        });
      },
      (err) => {
        this.snackbarService.push({
          message: err.message,
          type: 'error'
        });
        this.recipientSer.cache = [];
        this.paginator.firstPage();
        this.FillRecipientsFromSource();
        this.dialog.closeAll();
      },
      () => {
        this.recipientSer.cache = [];
        this.paginator.firstPage();
        this.FillRecipientsFromSource();
        this.dialog.closeAll();
      }
    );
  };

  AssignCategory = (e) => {
    from(e.categories)
      .pipe(
        concatMap((cat) =>
          this.recipientSer.RequestCategory(e.ids, cat as string)
        )
      )
      .subscribe(
        (res) => {
          this.snackbarService.push({
            message:
              'RECIPIENTORGANIZATION.BODY.RequestsCategories.MsgRequestSuccess',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
        },
        () => {
          this.eventsSubject.next(true);
          this.recipientSer.cache = [];
          this.paginator.firstPage();
          this.FillRecipientsFromSource();
          this.dialog.closeAll();
        }
      );
  };

  InviteRecipients = (e) => {
    e.recipients.forEach((recip) => {
      this.recipientSer.InviteRecipient(recip).subscribe(
        (res) => {
          this.snackbarService.push({
            message: 'RECIPIENTORGANIZATION.BODY.InviteRecipients.MsgSuccess',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
          this.dialog.closeAll();
        },
        () => {
          this.recipientSer.cache = [];
          this.paginator.firstPage();
          this.FillRecipientsFromSource();
          this.dialog.closeAll();
        }
      );
    });
  };

  fullRecipientFields(e) {
    delete e.email;

    let subscEdit = this.recipientSer.UpdateRecipient(e.id, e).subscribe(
      (res) => {
        this.snackbarService.push({
          message: 'SHARED.FULLRECIPIENTFIELDS.SNACKBAR.MsgFullSucces',
          type: 'success'
        });
      },
      (err) => {
        this.snackbarService.push({
          message: 'SHARED.FULLRECIPIENTFIELDS.SNACKBAR.MsgFullError',
          type: 'error'
        });
        this.recipientSer.cache = [];
        this.paginator.firstPage();
        this.FillRecipientsFromSource();
        this.dialog.closeAll();
      },
      () => {
        this.recipientSer.cache = [];
        this.paginator.firstPage();
        this.FillRecipientsFromSource();
        this.dialog.closeAll();
      }
    );
    this.unsubscribe.push(subscEdit);
  }

  SendCredentials = (checked) => {
    this.dialogSendCredentials.close({ checked: checked });
  };

  UploadDataEvent(e) {
    // alert('upload these recipients : ' + JSON.stringify(e));
    this.recipientSer.cache = [];
    this.paginator.firstPage();
    this.FillRecipientsFromSource();
    this.dialog.closeAll();
  }

  AcceptRecipients = (e) => {
    from(e)
      .pipe(concatMap((recip) => this.recipientSer.AcceptRequest(recip)))
      .subscribe(
        (data) => {
          this.snackbarService.push({
            message:
              'RECIPIENTORGANIZATION.BODY.RecipientRequests.MsgSuccessAccept',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
        },
        () => {
          this.paginatorRequests.firstPage();
          this.recipientSer.cacheRequest = [];
          this.FillRecipientsRequestsFromSource();
          if (this.resultsLengthRequest === 0) this.dialog.closeAll();
        }
      );
  };

  RejectRecipients = (e) => {
    from(e)
      .pipe(concatMap((recip) => this.recipientSer.RefuseRequest(recip)))
      .subscribe(
        (data) => {
          this.snackbarService.push({
            message:
              'RECIPIENTORGANIZATION.BODY.RecipientRequests.MsgSuccessReject',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: err.message,
            type: 'error'
          });
        },
        () => {
          this.paginatorRequests.firstPage();
          this.recipientSer.cacheRequest = [];
          this.FillRecipientsRequestsFromSource();
          if (this.resultsLengthRequest === 0) this.dialog.closeAll();
        }
      );
  };

  public get recipientsAsObs(): Observable<[]> {
    return of(this.recipients) as Observable<[]>;
  }

  InitFormGroup = (data?: any): void => {
    this.recipientFG = this.formbuilder.group(
      {
        firstname: [
          data?.firstname ?? '',
          {
            validators: [Validators.required, Validators.minLength(3)]
          }
        ],
        lastname: [
          data?.lastname ?? '',
          {
            validators: [Validators.required, Validators.minLength(3)]
          }
        ],
        email: [
          data?.email ?? '',
          {
            validators: [EmailValidator(this.utilsService)],
            asyncValidators: [this.existingEmailValidator(data?.email)],
            updateOn: 'blur'
          }
        ],
        phone: this.formbuilder.group({
          name: '',
          iso2: '',
          placeHolder: [
            data?.phone.placeHolder ?? '',
            {
              asyncValidators: [
                this.existingPhoneValidator(data?.phone.placeHolder)
              ]
            }
          ],
          flagClass: '',
          dialCode: '',
          priority: ''
        }),
        username: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              ValidateUsername()
            ],
            asyncValidators: [this.existingUserNameValidator()],
            updateOn: 'blur'
          }
        ],
        birthday: [data?.birthday ?? '', Validators.required]
      },
      {
        validators: [ValidationPhoneEmail]
      }
    );
  };

  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };

  Page(search?, entity: string = 'recipient'): Observable<Page<any>> {
    this.cpt = 0;
    let mainPaginator =
      entity === 'recipient' ? this.paginator : this.paginatorRequests;
    let pageSize = mainPaginator?.pageSize;
    let pageIndex = mainPaginator?.pageIndex;
    if (!mainPaginator) {
      if (entity === 'recipient') {
        this.isLoading = true;
        return this.recipientSer.GetRecipients(10, 0, search).pipe(
          map((data: Page<RecipientModel>): Page<RecipientModel> => {
            return data;
          })
        );
      } else {
        this.isLoadingRequests = true;
        return this.recipientSer.GetRequestsRecipient(5, 0, search).pipe(
          map((data: Page<RecipientModel>): Page<RecipientModel> => {
            return data;
          })
        );
      }
    } else
      return mainPaginator?.page.pipe(
        startWith(0),
        switchMap((): any => {
          if (this.cpt === 0) {
            this.cpt++;
            if (entity === 'recipient') {
              this.isLoading = true;
              return this.recipientSer
                .GetRecipients(pageSize, pageIndex, search)
                .pipe(catchError(() => of(null)));
            } else {
              this.isLoadingRequests = true;
              return this.recipientSer
                .GetRequestsRecipient(pageSize, pageIndex, search)
                .pipe(catchError(() => of(null)));
            }
          }
        }),
        map((data: Page<any>): Page<any> | null => {
          return data;
        })
      );
  }

  OnPaginatonPaged = (e) => {
    if (this.prevePageIndex !== e.pageSize) {
      this.prevePageIndex = e.pageSize;
      e.firstPage();
      this.recipientSer.cache = [];
    }
    this.FillRecipientsFromSource();
  };

  OnPaginatonRequestsPaged = (e) => {
    this.FillRecipientsRequestsFromSource(this.searchRequests);
  };

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  showSpinnerUsername: boolean = false;
  existingUserNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control && control.value !== '') {
        this.showSpinnerUsername = true;
        return this.recipientServiceIssuer.ValidateUsername(control.value).pipe(
          delay(400),
          map((resp) => {
            this.showSpinnerUsername = false;
            return resp.data
              ? { alreadyTaken: 'Username already taken' }
              : null;
          })
        );
      }
      return of(null);
    };
  }

  showSpinnerEmail: boolean = false;
  existingEmailValidator(email: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        (email === undefined || email !== control.value)
      ) {
        this.showSpinnerEmail = true;
        return this.recipientServiceIssuer.ValidateEmail(control.value).pipe(
          delay(400),
          map((resp) => {
            this.showSpinnerEmail = false;
            return resp.data ? { alreadyTaken: 'Email already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }

  showSpinnerPhone: boolean = false;
  existingPhoneValidator(phone: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (
        control &&
        control.value !== '' &&
        control.value !== null &&
        (phone === undefined || phone !== control.value)
      ) {
        this.showSpinnerPhone = true;
        let _phone = {
          dialCode: this.recipientFG.get('phone.dialCode')?.value,
          flagClass: this.recipientFG.get('phone.flagClass')?.value,
          iso2: this.recipientFG.get('phone.iso2')?.value,
          name: this.recipientFG.get('phone.name')?.value,
          placeHolder: control.value,
          priority: this.recipientFG.get('phone.priority')?.value
        };
        return this.recipientServiceIssuer.ValidatePhone(_phone).pipe(
          delay(400),
          map((resp) => {
            this.showSpinnerPhone = false;
            return resp.data ? { alreadyTaken: 'Phone already taken' } : null;
          })
        );
      }
      return of(null);
    };
  }
}
