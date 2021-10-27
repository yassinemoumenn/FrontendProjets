import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html'
})
export class DashboardWrapperComponent implements OnInit {
  demo?: string;
  @Input() DataChart;
  @Input() TitleChart;
  @Input() Icon;
  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.demo = this.layout.getProp('demo');
  }
}
