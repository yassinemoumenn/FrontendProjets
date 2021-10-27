import { AuthHTTPService } from './../../../../modules/auth/services/auth-http.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../core';
import { SubheaderService } from '../_services/subheader.service';
import { BreadcrumbItemModel } from '../_models/breadcrumb-item.model';
import { OrganizationService } from 'src/app/modules/Organization/organization.service';

@Component({
  selector: 'app-subheader1',
  templateUrl: './subheader1.component.html'
})
export class Subheader1Component implements OnInit {
  subheaderCSSClasses = '';
  subheaderContainerCSSClasses = '';
  subheaderMobileToggle = false;
  subheaderDisplayDesc = false;
  subheaderDisplayDaterangepicker = false;
  title$: Observable<string>;
  breadcrumbs$?: Observable<BreadcrumbItemModel[]>;
  breadcrumbs: BreadcrumbItemModel[] = [];
  description$?: Observable<string>;
  @Input() title?: string;

  showCancelImpersonate: boolean = false;

  constructor(
    private layout: LayoutService,
    private subheader: SubheaderService,
    private cdr: ChangeDetectorRef,
    private autservice: AuthHTTPService,
    private orgService: OrganizationService,
    private router: Router
  ) {
    this.title$ = this.subheader.titleSubject.asObservable();
  }

  ngOnInit() {
    this.title$ = this.subheader.titleSubject.asObservable();
    this.breadcrumbs$ = this.subheader.breadCrumbsSubject.asObservable();
    this.description$ = this.subheader.descriptionSubject.asObservable();
    this.subheaderCSSClasses = this.layout.getStringCSSClasses('subheader');
    this.subheaderContainerCSSClasses = this.layout.getStringCSSClasses(
      'subheader_container'
    );
    this.subheaderMobileToggle = this.layout.getProp('subheader.mobileToggle');
    this.subheaderDisplayDesc = this.layout.getProp('subheader.displayDesc');
    this.subheaderDisplayDaterangepicker = this.layout.getProp(
      'subheader.displayDaterangepicker'
    );
    this.breadcrumbs$.subscribe((res) => {
      this.breadcrumbs = res;
      this.cdr.detectChanges();
    });

    let impersonaterId = localStorage.getItem('impersonater') || '';
    if (impersonaterId !== '') {
      this.showCancelImpersonate = true;
    }
  }

  cancelImpersonation() {
    let impersonaterId = localStorage.getItem('impersonater') || '';
    if (impersonaterId !== '') {
      this.orgService
        .ReturnToOriginalUser(impersonaterId)
        .subscribe((res: any) => {
          localStorage.removeItem('impersonater');
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        });
    }
  }
}
