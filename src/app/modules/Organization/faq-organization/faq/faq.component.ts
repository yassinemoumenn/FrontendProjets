import { Component } from '@angular/core';
import {
  fadeInUpOnEnterAnimation,
  bounceOutDownOnLeaveAnimation
} from 'angular-animations';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation({
      anchor: 'enter',
      duration: 1000,
      delay: 100,
      translate: '30px'
    }),
    bounceOutDownOnLeaveAnimation({
      anchor: 'leave',
      duration: 500,
      delay: 200,
      translate: '40px'
    })
  ]
})
export class FaqComponent {
  isCollapsed: boolean = true;
  Collapsed: boolean = true;
  selectedItem: string = 'admin';
  elementSelected: string = 'admin';
  constructor() {}

  selected(elem) {
    this.elementSelected = elem;
  }
}
