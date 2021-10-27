import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  HostListener
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { catchError, map, startWith, switchMap, retry } from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Page } from 'src/app/models/Page';
import { User } from 'src/app/models/User';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { RecipientModel } from '../../recipient/Recipient.model';
import { CategoryModel } from '../category/Category.model';
import { CategoryService } from '../category/category.service';
import { DesignModel } from '../Designs/Design.model';
import { DesignService } from '../Designs/design.service';
import { RecipientsService } from '../recipients/recipients.service';
import { certificateModel, CertificateStatus } from './certificate.model';
import { CertificateService } from './certificate.service';
import { certificateBlockchainModel } from './certificateBlockchain.model';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent
  extends SmartComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  //view certiifcate data
  certificates$;
  //add certificate data
  recipient: Array<RecipientModel> = [];
  objToAdd!: certificateModel;
  status!: CertificateStatus;
  createDate: Date = new Date();
  //field certificate data
  designs$!: Observable<DesignModel[]>;
  categorySelected$!: Observable<CategoryModel>;
  //Upload certificate data
  AllDesigns$!: Observable<DesignModel[]>;
  //Issue certificate data
  category$!: Observable<CategoryModel[]>;
  filteredCertificates$;
  currentUserCreditWalletBalance: number = 0;
  loading: boolean = false;
  //selection
  selection = new SelectionModel<any>(true, []);
  selectionIssuePrivate = new SelectionModel<any>(true, []);
  selectionIssuePublic = new SelectionModel<any>(true, []);
  selectionCounter: number = 0;
  isloading: boolean = false;
  //pagination fields
  prevePageIndex: number = 10;
  resultsLengthRecipient: number = 0;
  cpt: number = 0;
  isLoading: boolean = false;
  //paginator of view certificate
  paginator: any;
  @ViewChild('view')
  paginatorGrandParent?: PaginationComponent;
  //paginator of add certificate
  paginator_Add: any;
  @ViewChild('add')
  paginatorAdd?: PaginationComponent;
  //paginator of issue certificate
  paginator_Issue: any;
  @ViewChild('issue')
  paginatorIssue?: PaginationComponent;

  //search and filter Add Certificate
  filterAddCertificate: string = '';
  searchAddCertificate: string = '';
  //search and filter View Certificate
  filterViewCertificate: string = '';
  searchViewCertificate: string = '';
  //search and filter Issue Certificate
  filterIssueCertificate: string = '';
  searchIssueCertificate: string = '';
  //Data to export
  dataToExport$!: Observable<[]>;
  subscriptions: Subscription[] = [];
  issuer;
  currentUser!: User;
  // certs;
  // filteredCerts;
  recipientToUpload$!: Observable<RecipientModel[]>;
  constructor(
    config: NgbDropdownConfig,
    public dialog: MatDialog,
    private certificateService: CertificateService,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService,
    public confirmDialogservice: ConfirmDialogService,
    private designService: DesignService,
    private recipientsService: RecipientsService,
    private userService: AuthenticationService
  ) {
    super();
    config.autoClose = true;
    config.placement = 'bottom-right';
  }
  ngOnInit(): void {
    this.recipientToUpload$ = this.recipientsService.GetRecipients().pipe(
      map((response) => {
        return response.data['content'];
      })
    );
    const first$ = this.certificateService
      .getAllCertificate(
        undefined,
        undefined,
        this.filterViewCertificate,
        this.searchViewCertificate
      )
      .pipe(
        map((response) => {
          return response.data['content'];
        }),
        startWith(null)
      );
    const second$ = this.certificateService.getAllCertificatesWatch().pipe(
      map((response) => {
        return response.body.data['content'];
      }),
      startWith(null)
    );
    this.subscriptions.push(
      combineLatest(first$, second$)
        .pipe(
          map(([data1, data2]) => {
            if (data2 === null) return data1;
            else return data2;
          })
        )
        .subscribe((result) => {
          this.certificates$ = result;
        })
    );

    this.dataToExport$ = this.certificateService.getAllCertificates().pipe(
      map((response) => {
        return response.data['content'];
      })
    );
    this.certificateService
      .getAllSignedCertificate(
        undefined,
        undefined,
        this.filterIssueCertificate,
        this.searchIssueCertificate
      )
      .pipe(
        map((res) => {
          return res.data['content'];
        })
      )
      .subscribe((result) => {
        this.filteredCertificates$ = result;
      });

    this.category$ = this.categoryService.getAllCategories().pipe(
      map((response) => {
        return response.data['content'];
      })
    );
    this.AllDesigns$ = this.designService.getDesigns().pipe(
      map((response) => {
        return response.data;
      })
    );
    this.subscriptions.push(
      this.certificateService.getCurrentGroup().subscribe((data) => {
        this.currentUserCreditWalletBalance = data.data.credits;
      })
    );
  }

  ngAfterViewInit(): void {
    //paginator view certificate
    this.paginator = this.paginatorGrandParent?.paginator;
  }
  /**
   * Revoke certificate
   *
   * @param reason - Reason of revoking certificate selected
   * @returns void
   */
  revokeCertificate({ reason }) {
    this.subscriptions.push(
      this.certificateService
        .revokeCertificate(reason.certificateID, reason.reason)
        .subscribe(
          (res) => {
            this.snackbarService.push({
              message: 'Certificate revoked successfully',
              type: 'success'
            });
            this.dialog.closeAll();
          },
          (err) => {
            this.snackbarService.push({
              message: 'Revoke certificate call in error:' + err.message,
              type: 'error'
            });
            this.certificateService.cache = [];
            this.paginator.firstPage();
            this.FillCertificateFromSource(
              this.filterViewCertificate,
              this.searchViewCertificate
            );
            this.dialog.closeAll();
          },
          () => {
            this.certificateService.cache = [];
            this.paginator.firstPage();
            this.FillCertificateFromSource(
              this.filterViewCertificate,
              this.searchViewCertificate
            );
            this.dialog.closeAll();
          }
        )
    );
  }
  /**
   * Delete certificate
   *
   * @returns void
   */
  deleteCertificate({ certificateID }) {
    const options = {
      title: 'Delete Certificte',
      message: 'Please confirm that you want to delete this certificate!',
      cancelText: 'CANCEL',
      confirmText: 'Confirm',
      waitDesciption: 'processing . . .'
    };

    this.confirmDialogservice.open(options);

    this.subscriptions.push(
      this.confirmDialogservice.confirmed().subscribe((confirmed) => {
        if (confirmed) {
          this.subscriptions.push(
            this.certificateService
              .deleteCertificate(certificateID.certificateID)
              .subscribe(
                (res) => {
                  this.snackbarService.push({
                    message: 'Certificate deleted successfully',
                    type: 'success'
                  });
                  this.dialog.closeAll();
                },
                (err) => {
                  this.snackbarService.push({
                    message: 'delete certificate call in error:' + err.message,
                    type: 'error'
                  });
                  this.certificateService.cache = [];
                  this.paginator.firstPage();
                  this.FillCertificateFromSource(
                    this.filterViewCertificate,
                    this.searchViewCertificate
                  );
                  this.dialog.closeAll();
                },
                () => {
                  this.certificateService.cache = [];
                  this.paginator.firstPage();
                  this.FillCertificateFromSource(
                    this.filterViewCertificate,
                    this.searchViewCertificate
                  );
                  this.dialog.closeAll();
                }
              )
          );
        }
      })
    );
  }
  /**
   * Open dialog to add new certificate
   *
   * @param addCertificateContent - Content to open of adding certificate
   * @returns void
   */
  openNewCertificateDialog(addCertificateContent) {
    let dialogRef = this.dialog.open(addCertificateContent, {
      width: '70%'
    });
    this.subscriptions.push(
      dialogRef.afterOpened().subscribe(() => {
        this.paginator_Add = this.paginatorAdd?.paginator;
        this.FillRecipientFromSource();
      })
    );
  }
  /**
   * Open dialog to upload multiple certificates
   *
   * @param uploadContent - Content to open of uploading certificates
   * @returns void
   */
  openUploadDialog(uploadContent) {
    this.dialog.open(uploadContent, {
      width: '70%'
    });
  }
  /**
   * Open dialog to issue certificates
   *
   * @param issueCertificateContent - Content to open of issuance certificates
   * @returns void
   */
  openIssueDialog(issueCertificateContent) {
    let dialogRef = this.dialog.open(issueCertificateContent, {
      width: '70%'
    });
    this.subscriptions.push(
      dialogRef.afterOpened().subscribe(() => {
        this.paginator_Issue = this.paginatorIssue?.paginator;
        this.FillIssueFromSource();
      })
    );
  }
  /**
   * Open dialog to fill up all fields of certificates
   *
   * @param fieldContent - Content to open of field of certificates
   * @returns void
   */
  openFieldCertificateDialog(fieldContent) {
    let dialogRef = this.dialog.open(fieldContent, {
      width: '70%'
    });
    this.isloading = true;
    this.designs$ = this.designService
      .getDesignByCategoryID(this.filterAddCertificate)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
    this.categorySelected$ = this.categoryService
      .getSingleCategory(this.filterAddCertificate)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  /**
   * Open export excel dialog
   *
   * @param exportExcel - Content to open
   * @returns void
   */
  openExportExcelDialog(exportExcel) {
    let dialogRef = this.dialog.open(exportExcel, {
      width: '40%'
    });
  }
  /**
   * Open export csv dialog
   *
   * @param exportCsv - Content to open
   * @returns void
   */
  openExportCsvDialog(exportCsv) {
    let dialogRef = this.dialog.open(exportCsv, {
      width: '40%'
    });
  }
  /**
   * Open export pdf dialog
   *
   * @param exportPdf - Content to open
   * @returns void
   */
  openExportPdfDialog(exportPdf) {
    let dialogRef = this.dialog.open(exportPdf, {
      width: '40%'
    });
  }
  /**
   * Event click on pagination, inside it we detect if the size options changed or not,
   * if changed we clean the cache and return the first page.
   * Paginator of view certificate
   *
   * @param e - paginator
   * @returns void
   */
  OnPaginatonPagedViewCertificate = (e) => {
    if (this.prevePageIndex !== e.pageSize) {
      this.prevePageIndex = e.pageSize;
      e.firstPage();
      this.certificateService.cache = [];
    }
    this.FillCertificateFromSource(
      this.filterViewCertificate,
      this.searchViewCertificate
    );
  };
  /**
   * Event click on pagination, inside it we detect if the size options changed or not,
   * if changed we clean the cache and return the first page.
   * Paginator of add new certificate
   *
   * @param e - paginator
   * @returns void
   */
  OnPaginatonPagedRecipient = (e) => {
    this.FillRecipientFromSource(
      this.filterAddCertificate,
      this.searchAddCertificate
    );
  };
  /**
   * Event click on pagination, inside it we detect if the size options changed or not,
   * if changed we clean the cache and return the first page.
   * Paginator of issue certificates
   *
   * @param e - paginator
   * @returns void
   */
  OnPaginatonPagedIssue = (e) => {
    this.FillIssueFromSource();
  };
  /**
   * Get needed items from the server, and fill the datasource (view certificate)
   *
   * @returns void
   */
  FillCertificateFromSource = (
    filterViewCertificate?: string,
    searchViewCertificate?: string
  ) => {
    this.subscriptions.push(
      this.Page(
        filterViewCertificate,
        searchViewCertificate,
        'certificate'
      ).subscribe((data) => {
        this.certificates$ = data;
        this.isLoading = false;
      })
    );
  };
  /**
   * Get needed items from the server, and fill the datasource (add new certificate)
   *
   * @param filter - param1 optional
   * @param search - param2 optional
   * @returns void
   */
  FillRecipientFromSource = (
    filterAddCertificate?: string,
    searchAddCertificate?: string
  ) => {
    this.subscriptions.push(
      this.Page(
        filterAddCertificate,
        searchAddCertificate,
        'recipient'
      ).subscribe(
        (data) => (
          (this.isLoading = false),
          (this.recipient = (data as any).data.content),
          (this.resultsLengthRecipient = (data as any).data.totalElements)
        )
      )
    );
  };
  /**
   * Get needed items from the server, and fill the datasource (issue certificates)
   *
   * @returns void
   */
  FillIssueFromSource = (
    filterIssueCertificate?: string,
    searchIssueCertificate?: string
  ) => {
    this.subscriptions.push(
      this.Page(
        filterIssueCertificate,
        searchIssueCertificate,
        'issue'
      ).subscribe((data) => {
        this.filteredCertificates$ = (data as any).data.content;
        this.isLoading = false;
      })
    );
  };
  /**
   * Get pages from the server
   *
   * @param pageSize - Required page size
   * @param pageIndex - Required page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @returns Observable<Page>
   */
  Page(filter?, search?, element: string = 'certificate'): Observable<Page> {
    let mainPaginator;
    if (element === 'certificate') mainPaginator = this.paginator;
    else if (element === 'recipient') {
      mainPaginator = this.paginator_Add;
    } else mainPaginator = this.paginator_Issue;

    let pageSize = mainPaginator.pageSize;

    let pageIndex = mainPaginator.pageIndex;

    this.cpt = 0;

    return mainPaginator.page.pipe(
      startWith(0),
      switchMap((): any => {
        if (this.cpt === 0) {
          this.cpt++;
          this.isLoading = true;
          if (element === 'certificate') {
            if (filter === 'All') this.filterViewCertificate = '';
            this.subscriptions.push(
              this.certificateService.closeWatch().subscribe()
            );
            this.certificateService.eventSource.close();
            const first$ = this.certificateService
              .getAllCertificate(
                undefined,
                undefined,
                this.filterViewCertificate,
                this.searchViewCertificate
              )
              .pipe(
                map((response) => {
                  return response.data['content'];
                }),
                startWith(null)
              );
            const second$ = this.certificateService
              .getAllCertificatesWatch()
              .pipe(
                map((response) => {
                  return response.body.data['content'];
                }),
                startWith(null)
              );

            return combineLatest(first$, second$).pipe(
              map(([data1, data2]) => {
                if (data2 === null) return data1;
                else return data2;
              })
            );
          } else if (element === 'recipient')
            return this.recipientsService
              .GetRecipients(pageSize, pageIndex, filter, search)
              .pipe(catchError(() => of(null)));
          else {
            return this.certificateService
              .getAllSignedCertificate(pageSize, pageIndex, filter, search)
              .pipe(catchError(() => of(null)));
          }
        }
      }),
      map((data: any): any => {
        return data;
      })
    );
  }
  /**
   * add certificate function
   *
   * @param formAdd - certificate data to add
   * @returns void
   */
  OnAddClicked({ formAdd }: { formAdd }) {
    const currentOrganization = this.userService.currentUserValue?.groups.find(
      (x) => x.currentOrganization === true
    );
    if (formAdd.category.signers.length > 0) {
      this.status = CertificateStatus.CREATED;
    } else {
      this.status = CertificateStatus.SIGNED;
    }
    const selectedRecipient = this.selection.selected[0];
    selectedRecipient.categories.forEach((response) => {
      if (response.id === formAdd.category.id) {
        formAdd.category.fields.recipient.forEach((element) => {
          response.fields.recipient.forEach((recipientField) => {
            element.value = recipientField.value;
          });
        });
        formAdd.category.customID.forEach((element) => {
          if (element.source === 'RECIPIENT') {
            response.fields.recipient.forEach((recipientField) => {
              if (element.field.name === recipientField.name) {
                element.field.value = recipientField.value;
              }
            });
          }
        });
      }
    });
    this.objToAdd = {
      certificateID: formAdd.certificateID,
      category: formAdd.category,
      recipient: {
        id: selectedRecipient.id,
        firstname: selectedRecipient.firstname,
        lastname: selectedRecipient.lastname,
        email: selectedRecipient.email,
        picture: selectedRecipient.picture
      },
      issuer: '',
      design: formAdd.design,
      signers: [],
      state: {
        createdAt: this.createDate,
        status: this.status
      },
      affiliation: {
        groupId: currentOrganization?.group.id,
        groupName: currentOrganization?.group.name,
        organizationName: currentOrganization?.organization.name
      }
    };
    this.subscriptions.push(
      this.certificateService.createCertificate(this.objToAdd).subscribe(
        () => {
          this.snackbarService.push({
            message: 'Certificate added successfully',
            type: 'success'
          });
          this.dialog.closeAll();
        },
        (err) => {
          this.snackbarService.push({
            message: 'Add new certificate call in error:' + err.message,
            type: 'error'
          });
          this.certificateService.cache = [];
          this.paginator.firstPage();
          this.FillCertificateFromSource(
            this.filterViewCertificate,
            this.searchAddCertificate
          );
          this.dialog.closeAll();
        },
        () => {
          this.certificateService.cache = [];
          this.paginator.firstPage();
          this.FillCertificateFromSource(
            this.filterViewCertificate,
            this.searchAddCertificate
          );
          this.dialog.closeAll();
        }
      )
    );
  }
  /**
   * calculate the number of certificate selected
   * @param Counter - Number of certificate
   * @returns void
   */
  prepareSelectedCertificatesForCreditTransactions({
    Counter
  }: {
    Counter: number;
  }) {
    this.selectionCounter = Counter;
  }
  /**
   * prepare certificate to issue
   *
   * @param dataToPrepare - data to issue
   * @returns void
   */
  prepareBlockchainCertificates(dataToPrepare) {
    let certificateIDs: string[] = [];
    for (let certificate of dataToPrepare.data) {
      certificateIDs.push(certificate.id!);
    }
    const issueCertificate = this.certificateService
      .generateCertificateCertIDs(certificateIDs)
      .pipe(
        switchMap((certificates) => {
          let blockchainCertificatesPrivate: certificateBlockchainModel[] = [];
          let blockchainCertificatesPublic: certificateBlockchainModel[] = [];

          for (let certificate of certificates.data) {
            let certificateFields =
              certificate.category.fields?.certificate.filter(
                (field) => field.inBlockchain
              );
            let recipientFields = certificate.category.fields?.recipient.filter(
              (field) => field.inBlockchain
            );

            let blockchainCertificateState = certificate.state;
            blockchainCertificateState.status = CertificateStatus.ISSUED;
            blockchainCertificateState.issuedAt = new Date();

            blockchainCertificatesPrivate.push(
              new certificateBlockchainModel({
                id: certificate.id,
                certificateID: certificate.certificateID,
                issuer: certificate.issuer,
                recipient: certificate.recipient.id,
                signers: certificate.signers,
                state: blockchainCertificateState,
                fields: {
                  recipient: recipientFields,
                  certificate: certificateFields
                }
              })
            );

            blockchainCertificatesPublic.push(
              new certificateBlockchainModel({
                id: certificate.id,
                certificateID: certificate.certificateID,
                issuer: certificate.issuer,
                fields: {
                  recipient: recipientFields,
                  certificate: certificateFields
                }
              })
            );
          }
          if (dataToPrepare.network === 'PRIVATE') {
            const body =
              this.certificateService.issuePrivateCertificateHyperledger({
                privateKey: dataToPrepare.identity.privateIdentity,
                certificates: blockchainCertificatesPrivate
              });
            return body;
          } else if (dataToPrepare.network === 'PUBLIC') {
            const body = this.certificateService.issuePublicCertificateEthereum(
              {
                privateKey: dataToPrepare.identity.publicIdentity,
                certificates: blockchainCertificatesPublic
              }
            );
            return body;
          } else {
            const body1 =
              this.certificateService.issuePrivateCertificateHyperledger({
                privateKey: dataToPrepare.identity.privateIdentity,
                certificates: blockchainCertificatesPrivate
              });
            const body2 =
              this.certificateService.issuePublicCertificateEthereum({
                privateKey: dataToPrepare.identity.publicIdentity,
                certificates: blockchainCertificatesPublic
              });
            return [body1, body2];
          }
        })
      )
      .pipe(
        switchMap((certificates: any) => {
          let certificatesBlockchainInformation: {
            network: string;
            data: {
              id: string;
              certificateID: string;
              txHash: string;
              block: string;
              timestamp: string;
            }[];
          } = { network: dataToPrepare.network, data: [] };
          for (let certificate of certificates) {
            certificatesBlockchainInformation.data.push({
              id: certificate.id,
              certificateID: certificate.certificateID,
              txHash: certificate.transactionId,
              block: certificate.blockNumber,
              timestamp: certificate.timestamp
            });
          }

          return this.certificateService.issueCertificateMongo(
            certificatesBlockchainInformation
          );
        })
      )
      .subscribe(
        (res) => {
          this.snackbarService.push({
            message: res.message,
            type: 'success'
          });
        },
        (err) => {
          this.dialog.closeAll();
          if (err.error) {
            this.snackbarService.push({
              message: err.error,
              type: 'error'
            });
          } else {
            this.snackbarService.push({
              message: 'Issuance unsuccessful: ' + err.message,
              type: 'error'
            });
          }
        },
        () => {
          this.dialog.closeAll();
        }
      );
    this.subscriptions.push(issueCertificate);
  }

  /**
   * Issue certificate clicked
   * @returns void
   */
  IssueCertificate() {
    if (this.currentUserCreditWalletBalance >= this.selectionCounter) {
      this.loading = true;
      let dataToPrepar;
      const privateSelection: certificateModel[] = JSON.parse(
        JSON.stringify(this.selectionIssuePrivate.selected)
      );
      const publicSelection = JSON.parse(
        JSON.stringify(this.selectionIssuePublic.selected)
      );

      const currentIdentity = this.certificateService
        .getCurrentBlockchainIdentity()
        .subscribe((data) => {
          if (publicSelection.length > 0 && privateSelection.length === 0) {
            dataToPrepar = {
              data: publicSelection,
              identity: data.data,
              network: 'PUBLIC'
            };
          }
          if (publicSelection.length > 0 && privateSelection.length > 0) {
            dataToPrepar = {
              data: publicSelection,
              identity: data.data,
              network: 'BOTH'
            };
          }
          if (publicSelection.length === 0 && privateSelection.length > 0) {
            dataToPrepar = {
              data: privateSelection,
              identity: data.data,
              network: 'PRIVATE'
            };
          }
          this.prepareBlockchainCertificates(dataToPrepar);
        });
      this.subscriptions.push(currentIdentity);
    } else {
      this.snackbarService.push({
        message: 'Not enough credits, contact your admin',
        type: 'warning'
      });
      this.dialog.closeAll();
    }
  }

  /**
   * Close Modal
   *
   * @param e - true to close, and false to ignore close
   * @returns void
   */
  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    let closeWatch = this.certificateService
      .closeWatch()
      .pipe(retry(3))
      .subscribe(
        () => {
          this.certificateService.emptyCache();
          this.subscriptions.forEach((sb) => sb.unsubscribe());
          this.certificateService.eventSource.close();
        },
        (err) => {},
        () => {
          closeWatch.unsubscribe();
        }
      );
  }
  /**
   * filter Category selected in add certificate
   *
   * @param filter - category selected
   * @returns void
   */
  OptionSelectedFilterAddCertificate = (filter) => {
    this.filterAddCertificate = filter;
    this.recipientsService.cache = [];
    this.FillRecipientFromSource(filter, this.searchAddCertificate);
  };
  /**
   * search in add certificate
   *
   * @param search -  keyword to search
   * @returns void
   */
  ApplySearchAddCertificate = (search) => {
    this.searchAddCertificate = search;
    this.recipientsService.cache = [];
    this.FillRecipientFromSource(this.filterAddCertificate, search);
  };
  /**
   * filter state selected in view certificate
   *
   * @param filter - state selected
   * @returns void
   */
  OptionSelectedFilterViewCertificate = (filter) => {
    this.filterViewCertificate = filter;
    this.certificateService.cache = [];
    this.FillCertificateFromSource(filter, this.searchViewCertificate);
  };
  /**
   * search in view certificate
   *
   * @param search -  keyword to search
   * @returns void
   */
  ApplySearchViewCertificate = (search) => {
    this.searchViewCertificate = search;
    this.certificateService.cache = [];
    this.FillCertificateFromSource(this.filterViewCertificate, search);
  };
  /**
   * filter category selected in issue certificate
   *
   * @param filter - category selected
   * @returns void
   */
  OptionSelectedFilterIssueCertificate = (filter) => {
    this.filterIssueCertificate = filter;
    this.certificateService.cache = [];
    this.FillIssueFromSource(filter, this.searchIssueCertificate);
  };
  /**
   * search in issue certificate
   *
   * @param search -  keyword to search
   * @returns void
   */
  ApplySearchIssueCertificate = (search) => {
    this.searchIssueCertificate = search;
    this.certificateService.cache = [];
    this.FillIssueFromSource(this.filterIssueCertificate, search);
  };
  uploadCertificate(data) {
    this.certificateService
      .uploadMultipleCertificates(data.file, data.category.id, data.design.id)
      .subscribe(
        () => {
          this.snackbarService.push({
            message: 'Certificates uploaded successfully',
            type: 'success'
          });
          this.dialog.closeAll();
        },
        (err) => {
          this.snackbarService.push({
            message: 'Upload certificates call in error:' + err.message,
            type: 'error'
          });
          this.certificateService.cache = [];
          this.paginator.firstPage();
          this.FillCertificateFromSource(
            this.filterViewCertificate,
            this.searchAddCertificate
          );
          this.dialog.closeAll();
        },
        () => {
          this.certificateService.cache = [];
          this.paginator.firstPage();
          this.FillCertificateFromSource(
            this.filterViewCertificate,
            this.searchAddCertificate
          );
          this.dialog.closeAll();
        }
      );
  }
}
