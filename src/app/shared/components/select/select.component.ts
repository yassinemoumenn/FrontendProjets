import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ControlValueAccessorConnector } from '../../services/utils/control-value-accessor-connector';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ]
})
export class SelectComponent extends ControlValueAccessorConnector {
  @Input() appearance: 'legacy' | 'fill' | 'standard' | 'outline' = 'outline';
  @Input() label: string = 'Select an option';
  @Input() placeholder: string = 'items';
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isMultiple: boolean = false;
  @Input() items: any[] = ['option1', 'option2', 'option3'];
  @Input() itemsObservable!: Observable<any>;
  @Input() cssClasses: string[] = [];
  @Input() values?: string[];
  @Input() ref: 'Observable' | 'none' = 'none';

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(injector: Injector) {
    super(injector);
  }

  selectionChanged($event: MatSelectChange) {
    this.optionSelected.emit($event.value);
  }
}
