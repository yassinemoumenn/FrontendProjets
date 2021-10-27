import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SmartComponent } from 'src/app/core/helpers/SmartComponent';
import { Page } from 'src/app/models/Page';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { RecipientService } from './recipient.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent {}
