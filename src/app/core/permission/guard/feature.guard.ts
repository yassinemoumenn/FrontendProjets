import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { SubUser } from 'src/app/models/Sub-user.model';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { PermissionService } from '../service/permission.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private permissionService: PermissionService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = this.permissionService.getUserInstance(
      this.authService.currentUserValue
    );


    return user instanceof SubUser &&
      this.permissionService.hasPermission(
        user,
        next.data.feature,
        next.data.permission
      )
      ? true
      : this.router.navigate(['/home'], {
        queryParams: { returnUrl: state.url }
      });
  }
}
