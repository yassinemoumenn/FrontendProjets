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
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import {
  catchError,
  delay,
  map,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Page } from 'src/app/models/helpers/Page';
import { IPhone } from 'src/app/models/User';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { ValidateUsername } from '../../recipient-organization/recipients/validate-username';
import { RecipientModel } from '../../recipient/Recipient.model';
import { CategoryModel } from '../category/Category.model';
import { EmailValidator } from '../sub-issuer/email-validation';
import { RecipientsService } from './recipients.service';
import { ValidationPhoneEmail } from './validation-phone-email';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent
  extends SmartComponent
  implements AfterViewInit, OnDestroy, OnInit {
  recipients: any[] = [];
  recipientsObs$: Observable<any> = of([]);

  recipientRequests: any[] = [];
  recipientRequestsObs$?: Observable<any>;

  paginator: any;
  @ViewChild('PaginationComponent1')
  paginatorGrandParent1?: PaginationComponent;

  paginatorRequests: any;
  @ViewChild('PaginationComponent2')
  paginatorGrandParent2?: PaginationComponent;

  isLoading: boolean = false;
  isLoadingRequests: boolean = false;
  resultsLength: number = -1;
  resultsLengthRequest: number = 0;
  prevePageIndex: number = 10;
  cpt: number = 0;
  search: string = '';
  searchRequests: string = '';
  recipientFG!: FormGroup;

  phoneInfo!: IPhone;

  subjetDeleteMuti: Subject<any> = new Subject();

  @ViewChild('templateRecipientRequest') templateRecipientRequest: any;
  @ViewChild('templateAsssignCategories') templateAsssignCategories: any;
  @ViewChild('templateAddEdit') templateAddEdit: any;
  @ViewChild('templateUploadRecipients') templateUploadRecipients: any;
  @ViewChild('templateInviteRecipients') templateInviteRecipients: any;
  @ViewChild('templateSendCredentials') templateSendCredentials: any;
  @ViewChild('templateExportRecipients') templateExportRecipients: any;
  @ViewChild('templateFullRecipientsFields') templateFullRecipientsFields: any;

  dataSendToEditAddCompo: {
    action: string;
    data?: any;
    title: string;
    categories: any[];
  } = {
    action: '',
    data: undefined,
    title: '',
    categories: []
  };

  idsToDelete: number[] = [];

  recipientIDToAssignCatCompo!: RecipientModel;
  recipientNameToAssignCatCompo: string = '';
  categories: any[] = [];
  _categories: any[] = [];
  categoriesAsObservable$!: Observable<any>;

  uploadRecipientsForm: FormGroup = new FormGroup({
    categories1Control: new FormControl('', Validators.required),
    fileFormatControl: new FormControl('', Validators.required),
    categories2Control: new FormControl('', Validators.required),
    designControl: new FormControl('', Validators.required)
  });

  exportTo: string = 'pdf';

  private unsubscribe: Subscription[] = [];

  recipientToSendCredentials: any;
  action: string = 'added';
  recipientDataToFull: any;
  constructor(
    private recipientService: RecipientsService,
    private dialog: MatDialog,
    private recipientServiceIssuer: RecipientsService,
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
    this.paginator = this.paginatorGrandParent1?.paginator;

    this.FillCategoriesFromSource();
    this.InitFormGroup();
    this.FillRecipientsRequestsFromSource();
  }

  FillRecipientsFromSource = (search?: string) => {
    let subscAllRecipients = this.Page(search).subscribe((data) => {
      this.isLoading = false;
      this.recipients = data.data.content;
      this.resultsLength = data.data.totalElements;
    });
    this.unsubscribe.push(subscAllRecipients);
  };

  FillRecipientsRequestsFromSource = (search?: string) => {
    let subscAllRecipientReq = this.Page(search, 'request').subscribe(
      (data) => {
        let _data: any = data as any;
        this.isLoadingRequests = false;
        this.recipientRequests = _data.data;
        this.resultsLengthRequest = _data.data.length;
      }
    );
    this.unsubscribe.push(subscAllRecipientReq);
  };

  FillCategoriesFromSource = () => {
    let subscAllCategories = this.recipientService.GetCategories().subscribe(
      (res) => {
        this.categories = res.data.content;
        this.categoriesAsObservable$ = of(this.categories);
      },
      (err) => alert(err)
    );
    this.unsubscribe.push(subscAllCategories);
  };

  ApplySearch = (search) => {
    this.search = search;
    this.recipientService.cache = [];

    this.FillRecipientsFromSource(search);
  };

  eventsSubject: Subject<any> = new Subject<any>();
  SearchRecipient(search) {
    let subs = this.recipientService
      .SearchRecipient(search)
      ?.subscribe((data) => {
        this.eventsSubject.next({ data: data.data, firstTime: true });
      });
    this.unsubscribe.push(subs as Subscription);
  }

  OpenDialogAdd = () => {
    this.dataSendToEditAddCompo = {
      action: 'add',
      data: undefined,
      title: 'ISSUER.RECIPIENT.BODY.AddEditRecipient.TitleAdd',
      categories: this.categories
    };
    let dialogRef = this.dialog.open(this.templateAddEdit, {
      width: '70%',
      panelClass: ['padding-0']
    });
    let subsDialogRef = dialogRef
      .afterClosed()
      .subscribe(() => this.InitFormGroup());
    this.unsubscribe.push(subsDialogRef);
  };

  OpenDialogToEdit = (e) => {
    if (e.data) {
      this.InitFormGroup(e.data);
      this.recipientFG.removeControl('password');
      this.recipientFG.removeControl('username');
      this.dataSendToEditAddCompo = {
        action: 'edit',
        data: e.data,
        title: 'ISSUER.RECIPIENT.BODY.AddEditRecipient.TitleEdit',
        categories: this.categories
      };
      let dialogRef = this.dialog.open(this.templateAddEdit, {
        width: '70%',
        panelClass: ['bg-transparent', 'padding-0']
      });

      let subscDialogRef = dialogRef
        .afterClosed()
        .subscribe(() => this.InitFormGroup());
      this.unsubscribe.push(subscDialogRef);
    }
  };

  OpenDialiogToDelete = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data;
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'ISSUER.RECIPIENT.BODY.ViewRecipients.CancelButton',
          confirmText: 'ISSUER.RECIPIENT.BODY.ViewRecipients.ConfirmButton',
          message:
            this.idsToDelete.length === 1
              ? 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgConfirmDelete'
              : 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgConfirmDeleteMulti',
          title: 'ISSUER.RECIPIENT.BODY.ViewRecipients.ConfirmDelete',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.DeleteRecipient(dialogRef);
    }
  };

  OpenDialiogToAssignCategory = (e) => {
    this.recipientIDToAssignCatCompo = e.data;
    this.recipientNameToAssignCatCompo =
      e.data.firstname + ' ' + e.data.lastname;
    this._categories = this.NotAssignCategories(e.data);
    if (this._categories.length > 0)
      this.dialog.open(this.templateAsssignCategories, {
        width: '40%',
        panelClass: ['padding-0']
      });
    else {
      this.snackbarService.push({
        message: 'All categories already signed to this recipient',
        type: 'info'
      });
    }
  };

  OpenDialogRequests = () => {
    let dialogRef = this.dialog.open(this.templateRecipientRequest, {
      width: '70%',
      height: '71%',
      panelClass: ['padding-0', 'custom-overflow']
    });
    let subsDialogRef = dialogRef.afterOpened().subscribe(() => {
      this.paginatorRequests = this.paginatorGrandParent2?.paginator;
      this.FillRecipientsRequestsFromSource();
    });
    let subsDialogRefClose = dialogRef.afterClosed().subscribe(() => {
      this.Init();
    });
    this.unsubscribe.push(subsDialogRef);
    this.unsubscribe.push(subsDialogRefClose);
  };

  OpenDialogToUploadRecipient = () => {
    let dialogRef = this.dialog.open(this.templateUploadRecipients, {
      width: '70%',
      height: '71%',
      panelClass: ['padding-0', 'custom-overflow']
    });
  };

  OpenDialogToInviteRecipients = () => {
    let dialogRef = this.dialog.open(this.templateInviteRecipients, {
      width: '70%',
      panelClass: ['padding-0', 'custom-overflow']
    });
  };

  OpenDialogToSendCredentials = (res, action) => {
    this.recipientToSendCredentials = res;
    this.action = action;
    let dialogRef = this.dialog.open(this.templateSendCredentials, {
      width: '50%',
      panelClass: ['padding-0', 'custom-overflow']
    });
    dialogRef.afterClosed().subscribe(() => {
      this.recipientToSendCredentials = null;
      this.action = '';
    });
  };

  OpenDialogToFullRecipientFields = (e) => {
    this.recipientDataToFull = e;
    let dialogRef = this.dialog.open(this.templateFullRecipientsFields, {
      width: '70%'
    });
  };
  DeleteRecipient = (dialogRef: any) => {
    let subscDelete = dialogRef.afterClosed().subscribe((ids) => {
      if (ids !== undefined && ids) {
        from(ids)
          .pipe(switchMap((id) => this.recipientService.DeleteRecipient(id)))
          .subscribe(
            (res) => {
              this.snackbarService.push({
                message:
                  'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgDeleteSuccess',
                type: 'success'
              });
            },
            (err) => {
              this.snackbarService.push({
                message: 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgDeleteError',
                type: 'error'
              });
              this.Init();
            },
            () => {
              this.Init();
            }
          );
      }
    });
    this.unsubscribe.push(subscDelete);
  };

  AddRecipient = (recipient: RecipientModel) => {
    let newRecipient;
    let cats: CategoryModel[] = recipient.categories;
    let catsToAdd = this.categories.filter(
      (cat) => cats.indexOf(cat.name) !== -1
    );

    recipient.categories = catsToAdd;

    recipient.categories.forEach((cat) => {
      let test = true;
      (cat as any).active = true;
      cat.fields.recipient.forEach((field) => {
        if (field.value === '') {
          try {
            field.value = recipient[field.name];
          } catch (error) {
            test = false;
          }
        }
      });
      cat.isActive = test;
    });

    let subscAdd = this.recipientService.CreateRecipient(recipient).subscribe(
      (res) => {
        this.snackbarService.push({
          message: 'ISSUER.RECIPIENT.BODY.AddEditRecipient.MsgSuccess',
          type: 'success'
        });
        newRecipient = res;
        newRecipient.data.password = recipient.password;
      },
      (err) => {
        this.snackbarService.push({
          message: 'ISSUER.RECIPIENT.BODY.AddEditRecipient.MsgError',
          type: 'error'
        });
        this.Init();
      },
      () => {
        this.Init();
        if (newRecipient) {
          this.OpenDialogToSendCredentials(newRecipient.data, 'added');
        }
      }
    );
    this.unsubscribe.push(subscAdd);
  };

  EditRecipient = (e) => {
    let cats = e.data.categories;
    let catsToEdit = this.categories.filter(
      (cat) => cats.indexOf(cat.name) !== -1
    );

    e.data.categories = catsToEdit;

    e.data.categories.forEach((cat) => {
      let test = true;
      (cat as any).active = true;
      cat.fields.recipient.forEach((field) => {
        if (field.value === '') {
          try {
            field.value = e.data[field.name];
          } catch (error) {
            test = false;
          }
        }
      });
      cat.isActive = test;
    });

    let subscEdit = this.recipientService
      .UpdateRecipient(e.id, e.data)
      .subscribe(
        (res) => {
          this.snackbarService.push({
            message: 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgEditSuccess',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgEditError',
            type: 'error'
          });
          this.Init();
        },
        () => {
          this.Init();
        }
      );
    this.unsubscribe.push(subscEdit);
  };

  AssignCategory = (e) => {
    let categories = e.categories;

    categories.forEach((cat) => {
      let test = true;
      (cat as any).active = true;
      cat.fields.recipient.forEach((field) => {
        if (field.value === '') {
          try {
            field.value = e.recipient[field.name];
          } catch (error) {
            test = false;
          }
        }
      });
      cat.isActive = test;
    });

    let subsAssign = this.recipientService
      .AssignCategories(e.recipient.id, categories)
      .subscribe(
        (res) => {
          this.snackbarService.push({
            message: 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgAssignSuccess',
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: 'ISSUER.RECIPIENT.BODY.ViewRecipients.MsgAssignError',
            type: 'error'
          });
          this.Init();
        },
        () => {
          this.Init();
        }
      );
    this.unsubscribe.push(subsAssign);
  };

  InviteRecipients = (e) => {
    let data = {
      userIDs: e.recipients,
      categories: e.categories.map((cat) => cat.id)
    };
    this.recipientService.InviteRecipients(data).subscribe(
      (data) => {
        this.snackbarService.push({
          message: data.message,
          type: 'success'
        });
      },
      (err) => {
        this.snackbarService.push({
          message: err.message,
          type: 'error'
        });
      }
    );
    this.Init();
  };

  UploadDataEvent = (e) => {
    this.Init();
  };

  ExportData = (e) => {
    this.exportTo = e;
    this.recipientsObs$ = of(this.recipients);
    this.dialog.open(this.templateExportRecipients, {
      width: '70%',
      panelClass: ['padding-0', 'custom-overflow']
    });
  };

  SendCredentials = () => {
    let phone = this.recipientToSendCredentials?.phone;
    let email = this.recipientToSendCredentials?.email;
    let userId = this.recipientToSendCredentials?.userId;
    if (phone) {
      let smsReq = {
        phoneNumber: phone,
        content: `
        Your account has been created on Doccerts, 
        Below are your system generated credentials, 
        please change the password immediately after login.
        Username : ${email === '' ? userId : email}
        Password : ${this.recipientToSendCredentials?.password ?? ''}`
      };
      this.recipientService.SendSms(smsReq).subscribe(
        (data) => {
          this.snackbarService.push({
            message: data.message,
            type: 'success'
          });
        },
        (err) => {
          this.snackbarService.push({
            message: 'Send credentials call in error: ' + err.message,
            type: 'error'
          });
          this.Init();
        },
        () => {
          this.Init();
        }
      );
    }
  };

  AcceptRecipient = (e) => {
    let type = e.recipient.type.trim().toLowerCase();
    if (type === 'organization') {
      let subs = from(e.ids)
        .pipe(
          switchMap((id) =>
            this.recipientService.AcceptRecipientOrgRequest(
              e.recipient.organization,
              id
            )
          )
        )
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: data.message,
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
            this.recipientService.cacheRequest = [];
            this.FillRecipientsRequestsFromSource();
          }
        );
      this.unsubscribe.push(subs);
    } else {
      let subs = from(e.ids)
        .pipe(
          switchMap((cat) =>
            this.recipientService.AcceptRecipientRequest(e.recipient.id, cat)
          )
        )
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: data.message,
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
            this.recipientService.cacheRequest = [];
            this.FillRecipientsRequestsFromSource();
          }
        );
      this.unsubscribe.push(subs);
    }
  };

  RejectRecipient = (e) => {
    let type = e.recipient.type.trim().toLowerCase();
    if (type === 'organization') {
      let subs = from(e.ids)
        .pipe(
          switchMap((id) =>
            this.recipientService.RefuseRecipientOrgRequest(
              e.recipient.organization,
              id
            )
          )
        )
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: data.message,
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
            this.recipientService.cacheRequest = [];
            this.FillRecipientsRequestsFromSource();
          }
        );
      this.unsubscribe.push(subs);
    } else {
      let subs = from(e.ids)
        .pipe(
          tap((id) => alert(id)),
          switchMap((id) =>
            this.recipientService.RefuseRecipientRequest(e.recipient?.id, id)
          )
        )
        .subscribe(
          (data) => {
            this.snackbarService.push({
              message: data.message,
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
            this.recipientService.cacheRequest = [];
            this.FillRecipientsRequestsFromSource();
          }
        );
      this.unsubscribe.push(subs);
    }
  };

  CountryChanged = (e) => {
    this.phoneInfo = e;
  };

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
          data?.username ?? '',
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
        occupation: [
          data?.occupation ?? '',
          {
            validators: [Validators.required, Validators.minLength(3)]
          }
        ],
        categories: [
          data?.categories.map((cat) => cat?.name) ?? '',
          {
            validators: [Validators.required]
          }
        ]
      },
      {
        validators: [ValidationPhoneEmail]
      }
    );
  };

  OnPaginatonPaged = (e) => {
    if (this.prevePageIndex !== e.pageSize) {
      this.prevePageIndex = e.pageSize;
      e.firstPage();
      this.recipientService.cache = [];
    }
    this.FillRecipientsFromSource(this.search);
  };

  OnPaginatonRequestsPaged = (e) => {
    this.FillRecipientsRequestsFromSource(this.searchRequests);
  };

  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };

  NotAssignCategories(recipient: any) {
    let difference = this.categories.filter((item) =>
      recipient.categories.every((cat) => cat.id !== item.id)
    );
    return difference;
  }

  Page(search?, entity: string = 'recipient'): Observable<Page<any>> {
    this.cpt = 0;
    let mainPaginator =
      entity === 'recipient' ? this.paginator : this.paginatorRequests;
    let pageSize = mainPaginator?.pageSize;
    let pageIndex = mainPaginator?.pageIndex;
    if (!mainPaginator) {
      if (entity === 'recipient') {
        this.isLoading = true;
        return this.recipientService.GetRecipients(10, 0, search).pipe(
          map(
            (data: Page<RecipientModel>): Page<RecipientModel> => {
              return data;
            }
          )
        );
      } else {
        this.isLoadingRequests = true;
        return this.recipientService.GetRequestsRecipient(5, 0, search).pipe(
          map(
            (data: Page<RecipientModel>): Page<RecipientModel> => {
              return data;
            }
          )
        );
      }
    }
    return mainPaginator.page.pipe(
      startWith(0),
      switchMap((): any => {
        if (this.cpt === 0) {
          this.cpt++;
          if (entity === 'recipient') {
            this.isLoading = true;
            return this.recipientService
              .GetRecipients(pageSize, pageIndex, undefined, search)
              .pipe(catchError(() => of(null)));
          } else {
            this.isLoadingRequests = true;
            return this.recipientService
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
  Init() {
    this.recipientService.cache = [];
    this.paginator.firstPage();
    this.FillRecipientsFromSource();
    this.dialog.closeAll();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  fullRecipientFields(e) {
    let subscEdit = this.recipientService.UpdateRecipient(e.id, e).subscribe(
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
        this.Init();
      },
      () => {
        this.Init();
      }
    );
    this.unsubscribe.push(subscEdit);
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
