import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ControlValueAccessorConnector } from '../../services/utils/control-value-accessor-connector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent
  extends ControlValueAccessorConnector
  implements AfterViewInit
{
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() appearance: 'legacy' | 'fill' | 'standard' | 'outline' = 'outline';
  @Input() ref: 'none' | 'prefix' | 'suffix' | 'phone' = 'none';
  @Input() type:
    | 'text'
    | 'date'
    | 'file'
    | 'time'
    | 'number'
    | 'password'
    | 'email'
    | 'tel' = 'text';
  @Input() iconClickable?: string = '';
  @Input() icon?: string;
  @Input() iconColor?: 'text-danger' | 'text-success';
  @Input() cssClasses: string[] = [];
  @Input() showSpinner: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() maxLength?: number | string;
  @Input() minLength: number = 0;
  @Input() hint?: string;
  @Input() showPhoneEg: boolean = false;

  @Output() typingStopped: EventEmitter<string> = new EventEmitter<string>();
  @Output() countryChanged: EventEmitter<Country> = new EventEmitter<Country>();
  @Output() iconClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('searchInput')
  searchInput?: ElementRef;

  constructor(injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.onTypingStopped();
  }

  onTypingStopped() {
    fromEvent(this.searchInput?.nativeElement, 'input')
      .pipe(map((event: any) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe((data) =>
        data.length !== 0
          ? this.typingStopped?.emit(data)
          : this.typingStopped?.emit(undefined)
      );
  }

  onCountryChanged($event: Country) {
    this.countryChanged.emit($event);
  }

  triggerEvent(event: Event) {
    this.iconClick.emit(event);
  }
}
