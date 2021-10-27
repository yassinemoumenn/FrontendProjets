import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Feature, Permission, SubUser } from 'src/app/models/Sub-user.model';
import { AuthenticationService } from 'src/app/modules/auth/authentication.service';
import { PermissionService } from '../service/permission.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit {
  @Input() permission!: Permission;
  @Input() feature!: Feature;

  constructor(
    private authService: AuthenticationService,
    private permissionService: PermissionService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  /**
   * The instanceof may not work as the user value we're getting from the authService may be an instance of the `User` and not the `SubUser`
   */
  ngOnInit() {
    const user = this.permissionService.getUserInstance(
      this.authService.currentUserValue
    );


    // eslint-disable-next-line no-unused-expressions
    user instanceof SubUser &&
      this.permissionService.hasPermission(user, this.feature, this.permission)
      ? this.viewContainer.createEmbeddedView(this.templateRef)
      : this.viewContainer.clear();
  }
}

/**
 * Structural directive that will check if the current sub-user has permission to show the template that this directive was called on,
 *  else it will remove it from the dom
 *
 * something like that :
 * <div
     *appPermission="permission.READ; feature: features.CERTIFICATE">
     ....
     </div>
 */
