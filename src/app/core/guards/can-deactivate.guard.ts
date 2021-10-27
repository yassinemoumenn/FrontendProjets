import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ComponentCanDeactivate } from 'src/app/core/guards/CanDeactivate';

// this guard is is to catch page changes for use with unsaved changes to prevent loss.

@Injectable()
export class CanDeactivateGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  constructor(private translate: TranslateService) {}

  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.equals()) {
      if (confirm(this.translate.instant('unsaved-info.message'))) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
