import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureGuard } from './guard/feature.guard';
import { PermissionService } from './service/permission.service';
import { PermissionDirective } from './directive/permission.directive';

@NgModule({
  declarations: [PermissionDirective],
  imports: [CommonModule],
  exports: [PermissionDirective],
  providers: [FeatureGuard, PermissionService]
})
export class PermissionModule {}
