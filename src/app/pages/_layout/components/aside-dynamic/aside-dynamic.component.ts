import { Organization } from 'src/app/models/Organization';
import { OrganizationService } from './../../../../modules/Organization/organization.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { DynamicAsideMenuService } from 'src/app/core/services/dynamic-aside-menu.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';

@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {
  user!: any;
  firstUserState?: User;
  menuConfig: any;
  subscriptions: Subscription[] = [];
  disableAsideSelfDisplay?: boolean;
  headerLogo?: string;
  brandSkin?: string;
  ulCSSClasses!: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses!: string;
  asideMenuDropdown;
  brandClasses!: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  currentUrl?: string;
  organization?: Organization;
  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private cdr: ChangeDetectorRef,
    private userService: AuthenticationService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown')
      ? '1'
      : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;

    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
        this.cdr.detectChanges();
      });
    this.subscriptions.push(routerSubscr);

    // menu load
    const menuSubscr = this.menu.menuConfig$.subscribe((res) => {
      this.menuConfig = res;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);
    // load user

    const sb = this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
      });
    this.subscriptions.push(sb);
    const sb2 = this.userService.currentOrganizationSubject
      .asObservable()
      .pipe(first((organization) => !!organization))
      .subscribe((organization) => {
        this.organization = Object.assign({}, organization);
      });
    this.subscriptions.push(sb2);
    // const sb2 = this.organizationService.getOrganization().subscribe((res) => {
    //   this.organization = res.data;
    // });
    // this.subscriptions.push(sb2);
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/logoDocWhite-light.png';
    }
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  roleTest(menuItem: any, user: any): boolean {
    switch (user.role) {
      case 'ADMIN':
        if (
          (menuItem.role === 'ADMIN' &&
            menuItem.type === this.organization?.type) ||
          menuItem.role === 'ANY'
        )
          return true;
        break;
      default:
        if (menuItem.role === user.role || menuItem.role === 'ANY') {
          if (menuItem.condition === 'organization required') {
            if (user.role === 'ISSUER') {
              let currentOrganization = user.groups.find(
                (x) => x.currentOrganization === true
              );
              return currentOrganization?.group ? true : false;
            } else if (user.role === 'RECIPIENT') {
              return user.groups.length > 0 ? true : false;
            }
          }
          return true;
        }
        return false;
    }
    return false;
  }
}
