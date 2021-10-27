import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists-widget11',
  templateUrl: './lists-widget11.component.html'
})
export class ListsWidget11Component implements OnInit {
  @Input() cssClass!: string;

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
