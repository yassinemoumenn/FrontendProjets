import { Component, EventEmitter, Input, Output } from '@angular/core';
interface listOption {
  key: string;
  value: string;
  icon: string;
}
@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent {
  @Input() Title: any;
  @Input() Description: any;
  @Input() LabelButton: any;
  @Input() Image = '';
  @Input() options!: listOption[];
  @Input() ref: 'Button' | 'DropDown' = 'Button';

  @Output() ButtonClickEvent = new EventEmitter();
  @Output() DropDownClickEvent = new EventEmitter();

  constructor() {}
  BtnCkick() {
    this.ButtonClickEvent.emit();
  }
  DDCkick(option) {
    this.DropDownClickEvent.emit(option);
  }
}
