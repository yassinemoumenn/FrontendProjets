import { Component, Injector, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessorConnector } from '../../services/utils/control-value-accessor-connector';
import HijriDate, { toHijri } from 'hijri-date/lib/safe';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends ControlValueAccessorConnector {
  @Input() label: string = 'Choose a date';
  @Input() icon?: string = 'date_range';
  @Input() iconColor?: 'text-danger' | 'text-success';
  @Input() placeholder: string = '';
  @Input() appearance: 'legacy' | 'fill' | 'standard' | 'outline' = 'outline';
  @Input() maxDate?: Date;
  @Input() minDate?: Date;

  @Input() cssClasses: string[] = [];
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() formControl;
  @Input() formControlName;

  @Input() range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  isHijriDate: boolean = false;
  myDate = Date();
  constructor(injector: Injector, private calendar: NgbCalendar) {
    super(injector);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    let x = document.getElementById('myDIV');
    x!.style.display = 'none';
  }
  ToggelDB() {
    let x = document.getElementById('myDIV');
    if (x!.style.display === 'none') {
      x!.style.display = 'block';
    } else {
      x!.style.display = 'none';
    }
  }
  model!: NgbDateStruct;
  today = this.calendar.getToday();
  SelectedDate(d) {
    this.model = d;
  }
  Today() {
    let cc = new Date();
    this.formControl.value = {
      year: cc.getDay(),
      month: cc.getMonth(),
      day: cc.getFullYear()
    };
  }
  switchDatePiker() {
    this.isHijriDate = !this.isHijriDate;
    if (this.isHijriDate) {
      this.today = new HijriDate();
    } else {
      this.today = this.calendar.getToday();
    }
  }
}
