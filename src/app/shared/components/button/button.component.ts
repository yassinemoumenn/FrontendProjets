import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends DumbComponent {
  @Input() ref: 'text' | 'icon' | 'image' | 'print' = 'text';

  @Input() label?: string;
  @Input() icon?: string;
  @Input() image?: string;
  @Input() printSectionId!: string;

  @Input() color?: 'primary' | 'accent' | 'warn' = 'primary';

  @Input() backgroundColor?: string;
  @Input() fontColor?: string;
  @Input() isDisabled?: boolean;
  @Input() isLoading?: boolean;

  @Input() cssClasses: string[] = [];

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    super();
  }

  onButtonClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
