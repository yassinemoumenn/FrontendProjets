import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubheaderService } from '../_services/subheader.service';
import { KTUtil } from '../../../../../assets/js/components/util';
import KTLayoutSubheader from '../../../../../assets/js/layout/base/subheader';
import { Router, ResolveEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-subheader-wrapper',
  templateUrl: './subheader-wrapper.component.html'
})
export class SubheaderWrapperComponent implements AfterViewInit {
  subheaderVersion$: Observable<string>;
  constructor(private subheader: SubheaderService, private router: Router) {
    this.subheader.setDefaultSubheader();
    this.subheaderVersion$ =
      this.subheader.subheaderVersionSubject.asObservable();

    const initSubheader = () => {
      setTimeout(() => {
        this.subheader.updateAfterRouteChanges(this.router.url);
      }, 0);
    };

    initSubheader();
    // subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(initSubheader);
  }

  ngAfterViewInit() {
    KTUtil.ready(() => {
      KTLayoutSubheader.init('kt_subheader');
    });
  }
}
