import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { ResponseObject } from 'src/app/models/helpers/ResponseObject';
import { User } from 'src/app/models/User';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { certificateModel } from '../../issuer/certificates/certificate.model';
import { CertificateService } from './certificate.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent
  extends SmartComponent
  implements AfterViewInit
{
  certificates: any;

  paginator: any;
  @ViewChild(PaginationComponent)
  paginatorGrandParent?: PaginationComponent;

  isLoading: boolean = false;
  resultsLength: number = -1;
  prevePageIndex: number = 10;
  cpt: number = 0;
  filter: string = '';
  search: string = '';
  sort: any = undefined;

  emptyList: boolean = true;

  certificateToShow!: certificateModel;
  @ViewChild('templateViewCertificate') templateViewCertificate;

  constructor(
    private certificateService: CertificateService,
    private notification: SnackbarService,
    private authService: AuthenticationService,
    public dialog: MatDialog
  ) {
    super();
  }
  ngAfterViewInit(): void {
    this.paginator = this.paginatorGrandParent?.paginator;
    this.FillCertificatesFromSource();
    if (this.resultsLength > 0) {
      this.emptyList = false;
    }
  }

  /**
   * Get needed items from the server, and fill the datasource (Certificates)
   *
   * @param filter - param1 optional
   * @param search - param2 optional
   * @param sort - param3 optional
   * @returns void
   */
  FillCertificatesFromSource = (
    filter?: string,
    search?: string,
    sort?: any
  ) => {
    let pageSize = this.paginator.pageSize;
    let pageIndex = this.paginator.pageIndex;

    this.Page(pageSize, pageIndex, filter, search, sort).subscribe(
      (data) => (
        (this.isLoading = false),
        // (this.certificates = data.data.content),
        // (this.resultsLength = data.data.totalElements)
        (this.certificates = [].concat.apply([], data as any)),
        (this.resultsLength = [].concat.apply([], data as any).length)
      )
    );
  };

  /**
   * Get needed items from the server, and fill status drop down to filter certificates
   *
   * @returns void
   */
  FillStatusFromSource = () => {
    let status = [
      // 'Issued',
      'Signed',
      'Created'
      // 'Revoked',
      // 'Expired',
      // 'Cancelled'
    ];
    status.unshift('All');
    return status;
  };

  /**
   * Get needed items from the server, and fill status drop down to filter certificates
   *
   * @param e - Id of certificate to sign
   * @returns void
   */
  SignCertificate = (certificateID) => {
    this.certificateService.signCertificate(certificateID).subscribe(
      (res) => {
        this.notification.push({
          message: res.message,
          type: 'success'
        });
      },
      (err) => {
        this.notification.push({
          message: err.message,
          type: 'success'
        });
      },
      () => {
        this.certificateService.cache = [];
        this.paginator.firstPage();
        this.FillCertificatesFromSource(this.filter);
      }
    );
  };

  /**
   * Get needed items from the server, and fill status drop down to filter certificates
   *
   * @param e - Id of certificate to unsign
   * @returns void
   */
  UnSignCertificate = (certificateID) => {
    this.certificateService.unSignCertificate(certificateID).subscribe(
      (res) => {
        this.notification.push({
          message: res.message,
          type: 'success'
        });
      },
      (err) => {
        this.notification.push({
          message: err.message,
          type: 'success'
        });
      },
      () => {
        this.certificateService.cache = [];
        this.paginator.firstPage();
        this.FillCertificatesFromSource();
      }
    );
  };
  rejectCertificate = ({ reason }) => {
    this.certificateService
      .rejectCertificate(reason.certificateID, reason.reason)
      .subscribe(
        (res) => {
          this.notification.push({
            message: res.message,
            type: 'success'
          });
          this.dialog.closeAll();
        },
        (err) => {
          this.notification.push({
            message: err.message,
            type: 'success'
          });
        },
        () => {
          this.certificateService.cache = [];
          this.paginator.firstPage();
          this.FillCertificatesFromSource();
        }
      );
  };
  eventsSubject: Subject<boolean> = new Subject<boolean>();
  SignCertificates = (certificateIDs) => {
    this.certificateService.signMultipleCertificates(certificateIDs).subscribe(
      (res) => {
        this.notification.push({
          message: res.message,
          type: 'success'
        });
      },
      (err) => {
        this.notification.push({
          message: err.message,
          type: 'success'
        });
      },
      () => {
        this.eventsSubject.next(true);
        this.certificateService.cache = [];
        this.paginator.firstPage();
        this.FillCertificatesFromSource('created');
      }
    );
  };

  UnSignCertificates = (e) => {
    alert('UnSign certificates N: ' + e);
  };

  ViewCertificates = (e) => {
    this.certificateToShow = e;
    this.dialog.open(this.templateViewCertificate, {
      width: '70%'
    });
  };

  /**
   * Get connected user
   *
   * @returns Observable<User | null>
   */
  public get ConnectedUser(): Observable<User | null> {
    return this.authService.currentUserSubject.asObservable();
  }

  /**
   * Remove the cache and filter data
   *
   * @param filter - param1
   * @returns void
   */
  OptionSelectedFilter = (filter) => {
    this.filter = filter;
    this.certificateService.cache = [];
    this.paginator.firstPage();
    this.FillCertificatesFromSource(filter, this.search, this.sort);
    this.emptyList = false;
  };

  /**
   * Remove the cache and search
   *
   * @param search - param1
   * @returns void
   */
  ApplySearch = (search) => {
    this.search = search;
    this.certificateService.cache = [];
    this.paginator.firstPage();
    this.FillCertificatesFromSource(this.filter, search, this.sort);
    this.emptyList = false;
  };

  /**
   * Event click on sort
   * Clean the cache and return the first page.
   *
   * @param sort - Required informations to sort data (sort and direction)
   * @returns void
   */
  SortData = (sort) => {
    this.sort = sort;
    this.paginator.firstPage();
    this.certificateService.cache = [];
    this.FillCertificatesFromSource(this.filter, this.search, this.sort);
    this.emptyList = false;
  };

  /**
   * Event click on pagination, inside it we detect if the size options changed or not,
   * if changed we clean the cache and return the first page.
   *
   * @param e - paginator
   * @returns void
   */
  OnPaginatonPaged = (e) => {
    if (this.prevePageIndex !== e.pageSize) {
      this.prevePageIndex = e.pageSize;
      e.firstPage();
      this.certificateService.cache = [];
    }
    this.FillCertificatesFromSource(this.filter, this.search, this.sort);
    this.emptyList = false;
  };

  /**
   * Get pages from the server
   *
   * @param pageSize - Required page size
   * @param pageIndex - Required page index
   * @param filter - Optional value used in the filter
   * @param search - Optional value used in the search
   * @param sort - Optional, reaquierd informations to sort data (sort and direction)
   * @returns Observable<Page>
   */
  Page(
    pageSize,
    pageIndex,
    filter?,
    search?,
    sort?
  ): Observable<ResponseObject<any>> {
    this.cpt = 0;

    return this.paginator.page.pipe(
      startWith(0),
      switchMap((): any => {
        if (this.cpt === 0) {
          this.cpt++;
          this.isLoading = true;
          return this.certificateService
            .getCertificates(pageSize, pageIndex, filter, search, sort)
            .pipe(catchError(() => of(null)));
        }
      }),
      map((data: any): Observable<ResponseObject<any>> => {
        return data;
      })
    );
  }
  /** Close Modal
   *
   * @param e - true to close, and false to ignore close
   * @returns void
   */
  Dismiss = (e) => {
    if (e as boolean) {
      this.dialog.closeAll();
    }
  };
}
