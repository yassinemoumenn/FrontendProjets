import { HostListener, Directive } from '@angular/core';

@Directive()
export abstract class ComponentCanDeactivate {
  abstract equals(): boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.equals()) {
      $event.returnValue = true;
    }
  }
}
