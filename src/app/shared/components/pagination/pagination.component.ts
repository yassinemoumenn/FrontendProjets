import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent extends DumbComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() isLoading: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor() {
    super();
  }

  onPaginationChanged() {
    this.pageEvent.emit(this.paginator);
  }
}
