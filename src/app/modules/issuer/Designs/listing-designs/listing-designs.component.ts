import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { CategoryService } from './../../category/category.service';
import { ResponseObject } from './../../../../models/helpers/ResponseObject';
import { DesignModel } from './../Design.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../../../../../src/app/shared/confirm-dialog/confirm-dialog.service';
import { DesignService } from '../design.service';

@Component({
  selector: 'app-listing-designs',
  templateUrl: './listing-designs.component.html',
  styleUrls: ['./listing-designs.component.scss']
})
export class ListingDesignsComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  css: any;
  html: any;
  Recto!: boolean;
  hasVerso!: boolean;
  NameDesign;
  listDesigns: DesignModel[] = [];
  listLength;
  displayedRows$;
  side: string = 'Recto';
  ListCategories: string[] = [];
  categories: any;
  constructor(
    public dialog: MatDialog,
    private readonly _designService: DesignService,
    public dialogservice: ConfirmDialogService,
    private categoryservice: CategoryService
  ) {}

  init() {
    DesignService.newDes = true;
    this._designService
      .getDesigns()
      .subscribe((res: ResponseObject<DesignModel[]>) => {
        this._designService.listDesigns = res.data;

        this.listDesigns = res.data;
        this.listLength = res.data.length;
        this.displayedRows$ = this._designService.getDesignsPage(
          this.listDesigns,
          this.pageIndex,
          this.pageSize
        );
      });
    this.categoryservice.getAllCategories().subscribe((res) => {
      let Allcategories = res.data['content'];
      this.categories = Allcategories;
      this.categories.forEach((element) => {
        this.ListCategories.push(<string>element.name);
      });
    });
    this.displayedRows$.sort = this.sort;
  }
  ngOnInit() {
    this.init();
  }

  OptionSelectedFilter(filter) {
    let category = this.categories.filter(
      (category) => category.name === filter
    )[0];
    this._designService
      .getDesignByCategoryID(<string>category.id)
      .subscribe((res) => {
        this.displayedRows$ = of(res.data);
        this.listLength = res.data.length;
      });
  }

  ApplySearch(filter) {
    this.displayedRows$ = this._designService.Search(
      this.listDesigns,
      filter,
      this.pageIndex,
      this.pageSize
    );
    this.listLength = this._designService.listLength;
  }

  public columns = [
    'name',
    'category',
    'affected',
    'time',
    'doubleSide',
    'Actions'
  ];
  page1: string = '';
  page2: string = '';
  img = '../../../../../assets/media/svg/misc/Recipient.svg';
  title = 'Welcome!';
  Desc =
    'There are no Designs added yet! ' +
    '\n' +
    ' Kickstart your business by adding your first design.';

  labelButton = 'Add design';

  public pageIndex: number = 0;
  public pageSize: number = 5;

  openDialog(content, design): void {
    this.page1 = design.recto.html + design.recto.css;
    this.page2 = design.verso.html + design.verso.css;
    this.NameDesign = design.name;
    this.hasVerso = design.verso.html === undefined ? false : true;

    this.dialog.open(content, {
      disableClose: true,
      width: '70%',
      height: '97%'
    });
    let app1 = document.getElementById('DivToShowRecto');
    app1!.innerHTML = this.page1;

    let app2 = document.getElementById('DivToShowVerso');
    app2!.innerHTML = this.page2;
  }

  close() {
    this.dialog.closeAll();
  }
  RectoVErso() {
    if (this.Recto) {
      this.side = 'Recto';
      let app1 = document.getElementById('DivToShowRecto');
      app1!.innerHTML = this.page1;
    } else {
      this.side = 'Verso';
      let app2 = document.getElementById('DivToShowRecto');
      app2!.innerHTML = this.page2;
    }
    this.Recto = !this.Recto;
  }

  deletDesign(des) {
    this._designService.deleteDesigns([des.id]).subscribe((res) => {});
    this.init();
  }

  paginationCategory({ paginator }: { paginator: any }) {
    this.pageIndex = paginator.pageIndex;
    this.pageSize = paginator.pageSize;
    this.displayedRows$ = this._designService.pagination(
      this.listDesigns,
      paginator
    );
  }

  copyRow(design) {
    this._designService.createDesign([design]).subscribe((res) => {});
    this.init();
  }

  modiffier(design) {
    this._designService.RedirectToUpdate(design, this.pageIndex, this.pageSize);
    this.listLength = this._designService.listDesigns.length;
  }

  EmptyListClickEvent(event) {
    this._designService.EmptyListClickEvent();
  }
  onMatSortChange() {}
}
