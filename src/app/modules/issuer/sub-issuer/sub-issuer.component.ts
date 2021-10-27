import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { SubIssuerService } from './sub-issuer.service';
import { EmailValidator } from './email-validation';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Page } from 'src/app/models/Page';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

@Component({
  selector: 'app-sub-issuer',
  templateUrl: './sub-issuer.component.html',
  styleUrls: ['./sub-issuer.component.scss']
})
export class SubIssuerComponent
  extends SmartComponent
  implements AfterViewInit {
  subIssuers: any[] = [];
  positions: string[] = [];
  permissions: string[] = [];
  @ViewChild('templateAddEdit') templateAddEdit: any;
  dataSendToEditAddCompo: {
    action: string;
    data?: any;
    title: string;
    positions: string[];
    permissions: string[];
  } = {
    action: '',
    data: undefined,
    title: '',
    positions: [],
    permissions: []
  };

  paginator: any;
  idsToDelete: number[] = [];
  msgConfirmDelete: string = '';

  @ViewChild(PaginationComponent)
  paginatorGrandParent?: PaginationComponent;

  subIssuerFG: FormGroup = new FormGroup({});

  isLoading: boolean = false;
  resultsLength: number = 0;
  prevePageIndex: number = 10;
  cpt: number = 0;
  filter: string = '';
  search: string = '';

  constructor(
    private dialog: MatDialog,
    private formbuilder: FormBuilder,
    private utilsService: UtilsService,
    private subIssuerService: SubIssuerService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.paginator = this.paginatorGrandParent?.paginator;
    //Initiate All the Required Data from the Dumb Components
    this.FillSubIssuersFromSource();
  }

  /**
   * Get needed items from the server, and fill the datasource (SubIssuers)
   *
   * @param filter - param1 optional
   * @param search - param2 optional
   * @returns void
   */
  FillSubIssuersFromSource = (filter?: string, search?: string) => {
    let pageSize = this.paginator.pageSize;
    let pageIndex = this.paginator.pageIndex;
    this.Page(pageSize, pageIndex, filter, search).subscribe(
      (data) => (
        (this.isLoading = false),
        (this.subIssuers = data.content),
        (this.resultsLength = data.totalElements)
      )
    );
  };

  /**
   * Remove the cache and filter data
   *
   * @param filter - param1
   * @returns void
   */
  OptionSelectedFilter = (filter) => {
    this.filter = filter;
    this.subIssuerService.cache = [];
    this.FillSubIssuersFromSource(filter, this.search);
  };

  /**
   * Remove the cache and search
   *
   * @param filter - param1
   * @returns void
   */
  ApplySearch = (search) => {
    this.search = search;
    this.subIssuerService.cache = [];
    this.FillSubIssuersFromSource(this.filter, search);
  };

  /**
   * Get all positions from the server
   *
   * @returns string[]
   */
  FillPositionsFromSource = (): string[] => {
    return ['position1', 'position2', 'position3', 'position4'];
  };

  /**
   * Get all permissions from the server
   *
   * @returns string[]
   */
  FillPirmissionsFromSource = (): string[] => {
    return ['approver', 'writeread', 'read'];
  };

  /**
   * LOGIC,Call Service to Add Sub Issuer (POST)
   *
   * @param e - Object that contains the data to add
   * @returns void
   */
  AddSubIssuer = (e) => {
    alert('add this sub issuer to DB : ' + JSON.stringify(e.data));
  };

  /**
   * LOGIC,Call Service to Edit Sub Issuer (PUT)
   *
   * @param e - Object that contains the id of subissuer to edit, and contains also the new data
   * @returns void
   */
  EditSubIssuer = (e) => {
    alert(`edit sub issuer N${e.id} by : ${JSON.stringify(e.data)}`);
  };

  /**
   * ,Call Service to Delete Sub Issuer (DELETE)
   *
   * @param dialogRef - Subscribe it and retrieve the id of sub issuer to delete
   * @returns void
   */
  DeleteSubIssuer = (dialogRef: any) => {
    dialogRef.afterClosed().subscribe((id) => {
      if (id !== undefined && id) alert(`delete sub issuer N: ${id}`);
    });
  };

  /**
   * LOGIC, Call Service to Delete Selected Sub Issuers (DELETE)
   *
   * @param dialogRef - Subscribe it and retrieve the ids of sub issuers to delete
   * @returns void
   */
  DeleteSelectedSubIssuers = (dialogRef: any) => {
    dialogRef.afterClosed().subscribe((id) => {
      if (id !== undefined && id) alert(`delete sub issuers N: ${id}`);
    });
  };

  /**
   * Open dialog to add new sub issuer
   *
   * @returns void
   */
  OpenDialogAdd = () => {
    this.InitFormGroup();

    this.dataSendToEditAddCompo = {
      action: 'add',
      data: undefined,
      title: 'SUBUSER.TITLEADDSUBISSUER',
      positions: this.FillPositionsFromSource(),
      permissions: this.FillPirmissionsFromSource()
    };
    this.dialog.open(this.templateAddEdit, {
      width: '70%',
      panelClass: ['padding-0']
    });
  };

  /**
   * Open dialog to edit sub issuer
   *
   * @param e - Object that contains the sub issuer to edit
   * @returns void
   */
  OpenDialogToEdit = (e) => {
    if (e.data) {
      this.InitFormGroup(e.data);
      this.dataSendToEditAddCompo = {
        action: 'edit',
        data: e.data,
        title: 'SUBUSER.TITLEEDITSUBISSUER',
        positions: this.FillPositionsFromSource(),
        permissions: this.FillPirmissionsFromSource()
      };
      this.dialog.open(this.templateAddEdit, {
        width: '70%',
        panelClass: ['bg-transparent', 'padding-0']
      });
    }
  };

  /**
   * Open dialog to delete sub issuer
   *
   * @param e - Object that contains the sub issuer to delete
   * @returns void
   */
  OpenDialiogToDelete = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data?.id;
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'SUBUSER.BTNCANCEL',
          confirmText: 'SUBUSER.BTNCONFIRM',
          message: 'SUBUSER.MSGCONFIRM',
          title: 'SUBUSER.TITLECONFIRM',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.DeleteSubIssuer(dialogRef);
    }
  };

  /**
   * Open dialog to delete selected sub issuers
   *
   * @param e - Object that contains the sub issuers to delete
   * @returns void
   */
  OpenDialiogToDeleteSelectedItems = (e) => {
    if (e.data) {
      this.idsToDelete = [];
      this.idsToDelete = e.data.map((obj) => obj.id);
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          cancelText: 'SUBUSER.BTNCANCEL',
          confirmText: 'SUBUSER.BTNCONFIRM',
          message: 'SUBUSER.MSGCONFIRMDELETEMULTI',
          title: 'SUBUSER.TITLECONFIRM',
          idsToDelete: this.idsToDelete
        },
        panelClass: ['padding-24']
      });
      this.DeleteSelectedSubIssuers(dialogRef);
    }
  };

  /**
   * Initialize the form group to add and edit sub issuer
   *
   * @param data - Oprional : case edit we pass the sub issuer to be edited
   * @returns void
   */

  InitFormGroup = (data?: any): void => {
    this.subIssuerFG = this.formbuilder.group({
      firstname: [data?.firstname ?? '', [Validators.required]],
      lastname: [data?.lastname ?? '', [Validators.required]],
      email: [
        data?.email ?? '',
        [Validators.required, EmailValidator(this.utilsService)]
      ],
      phone: [data?.phone, [Validators.required]],
      position: [data?.position ?? '', [Validators.required]],
      permissions: [data?.permissions ?? '', [Validators.required]]
    });
  };

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
      this.subIssuerService.cache = [];
    }
    this.FillSubIssuersFromSource(this.filter, this.search);
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
  Page(pageSize, pageIndex, filter?, search?): Observable<Page> {
    this.cpt = 0;
    return this.paginator.page.pipe(
      startWith(0),
      switchMap((): any => {
        if (this.cpt === 0) {
          this.cpt++;
          this.isLoading = true;
          return this.subIssuerService
            .GetSubIssuers(pageSize, pageIndex, filter, search)
            .pipe(catchError(() => of(null)));
        }
      }),
      map(
        (data: any): Page => {
          if (data === null)
            return {
              content: [],
              totalElements: 0,
              number: 0,
              size: 0
            };
          return {
            content: data,
            totalElements: this.subIssuerService.GetAllItemsLength(),
            number: pageIndex,
            size: pageSize
          };
        }
      )
    );
  }
}
