import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DumbComponent } from 'src/app/core/helpers/DumbComponent';
import { Organization } from 'src/app/models/Organization';

@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewOrganizationComponent extends DumbComponent {
  @Input() displayedRows$!: Organization[];
  columns = ['name', 'groups', 'domain', 'webSite', 'Address'];
  constructor() {
    super();
  }
}
