import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ExportDataService } from './../../services/export-data.service';
import { MatSelectionList } from '@angular/material/list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {
  @Input() exportTo: string = ''; // 'pdf' | 'exel' | 'csv' = 'pdf';
  data!: any[];
  @Input() DATA!: Observable<any[]>;
  @Input() fileName: string = 'exportData';
  @Input() headers: string[] = [];
  @Input() filterBy: string = '';
  @Input() filterOption?: string;
  @Input() filterValues: string[] = [];
  // ! displayed headers must have the same order as the headers
  @Input() displayedHeaders: string[] = []; // optional : if you want to display diffrenet headers  in the exported file
  @Output() dismissDialog: EventEmitter<boolean> = new EventEmitter(false);
  @Output() CancelClick = new EventEmitter();
  @ViewChild('AllColumns', { static: true })
  private AllColumns!: MatSelectionList;
  columnsSelected;
  subscription!: Subscription;
  constructor(private exportService: ExportDataService) {}

  public headersForm: FormGroup = new FormGroup({
    selected: new FormControl([], [Validators.required]),
    filter: new FormControl([])
  });

  selectAll(event) {
    if (event.selected === true) {
      this.AllColumns.selectAll();
    } else {
      this.AllColumns.deselectAll();
    }
  }

  Export() {
    let selectedDisplayedHeaders: string[] = [];
    let newData;

    if (this.displayedHeaders.length !== 0) {
      selectedDisplayedHeaders = this.getDisplayedHeaders(
        this.headersForm.value.selected
      );
    } else {
      selectedDisplayedHeaders = this.headersForm.value.selected;
    }

    if (this.headersForm.value.filter.length > 0) {
      newData = this.filterData(this.headersForm.value.filter);
    } else {
      newData = this.data;
    }
    this.filterData(this.headersForm.value.filter);

    if (this.exportTo === 'pdf') {
      this.exportService.exportToPdf(
        this.fileName,
        newData,
        this.headersForm.value.selected,
        selectedDisplayedHeaders
      );
    } else if (this.exportTo === 'exel') {
      this.exportService.ExportToExel(
        this.fileName,
        newData,
        this.headersForm.value.selected,
        'xlsx',
        selectedDisplayedHeaders
      );
    } else if (this.exportTo === 'csv') {
      this.exportService.exportTOCsv(
        this.fileName,
        newData,
        this.headersForm.value.selected,
        selectedDisplayedHeaders
      );
    }
  }

  ngOnInit(): void {
    this.subscription = this.DATA.subscribe((d) => {
      this.data = d;
    });
  }

  Dismiss(e) {
    if (e) this.dismissDialog.emit(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDisplayedHeaders(selectedHeaders: string[]) {
    let selectedDisplayedHeaders: string[] = [];
    selectedHeaders.forEach((h) => {
      for (let i = 0; i <= this.headers.length; i++) {
        let header = this.headers[i];
        if (h === header) {
          selectedDisplayedHeaders.push(this.displayedHeaders[i]);
        }
      }
    });
    return selectedDisplayedHeaders;
  }

  filterData(filterValue: string) {
    let filteredData: any[] = [];
    this.data.forEach((d) => {
      if (this.filterOption) {
        let o = d[this.filterBy];
        if (o[this.filterOption] === filterValue) {
          filteredData.push(d);
        }
      } else {
        if (d[this.filterBy] === filterValue) {
          filteredData.push(d);
        }
      }
    });
    return filteredData;
  }
}
