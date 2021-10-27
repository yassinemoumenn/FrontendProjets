import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { Input, Injectable } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbCalendarIslamicCivil,
  NgbCalendarIslamicUmalqura,
  NgbDatepickerI18n,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from '../datepicker.component';

const I18N_VALUES = {
  weekdays: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
  months: [
    'محرم',
    'صفر',
    'ربيع الأول',
    ' ربيع الثاني',
    'جمادى الأولى',
    'جمادى الثاني',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة'
  ]
};

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
  constructor() {
    super();
  }

  getWeekdayShortName(weekday: number) {
    return I18N_VALUES.weekdays[weekday - 1];
  }

  getMonthShortName(month: number) {
    return I18N_VALUES.months[month - 1];
  }

  getMonthFullName(month: number) {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-hijri-datepicker',
  templateUrl: './hijri-datepicker.component.html',
  styleUrls: ['./hijri-datepicker.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ar-ma' },

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HijriDatepickerComponent,
      multi: true
    }
  ]
})
export class HijriDatepickerComponent {
  constructor(private calendar: NgbCalendar) {}
  private innerValue!: string;
  private changed: any[] = [];
  private touched: any[] = [];
  private disabled!: boolean;

  @Input() placeholder!: string;
  @Input() label: string = 'Choose a date';
  @Input() appearance: 'legacy' | 'fill' | 'standard' | 'outline' = 'outline';
  @Input() isRequired!: boolean;
  @Input() formControl: FormControl = new FormControl(Date());
  @Input() footerTemplate!: TemplateRef<any>;
  @Output() SelectedDate = new EventEmitter();
  model!: NgbDateStruct;
  today = this.calendar.getToday();
  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach((f) => f(value));
    }
  }

  onDateSelect(v) {
    this.SelectedDate.emit(v);
  }

  registerOnChange(fn: any): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.touched.push(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: string): void {
    this.innerValue = obj;
  }
}
