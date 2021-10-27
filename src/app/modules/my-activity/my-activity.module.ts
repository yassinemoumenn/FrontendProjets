import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyActivityComponent } from './my-activity.component';

const routes: Routes = [{ path: '', component: MyActivityComponent }];

export const routing = RouterModule.forChild(routes);

@NgModule({
  declarations: [MyActivityComponent],
  imports: [CommonModule, routing, SharedModule]
})
export class MyActivityModule {}
