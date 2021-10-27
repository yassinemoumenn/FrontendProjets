import { Component, Input } from '@angular/core';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html'
})
export class Dashboard1Component {
  @Input() DataChart;
  @Input() TitleChart;
  @Input() Icon;

  constructor() {}
}
