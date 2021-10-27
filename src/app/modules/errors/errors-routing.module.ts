import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorsComponent } from './errors.component';
import { Errors404Component } from './404/404.component';
import { Error403Component } from './403/403.component';
import { Error503Component } from './503/503.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorsComponent,
    children: [
      { path: '', redirectTo: '404', pathMatch: 'full' },
      {
        path: '404',
        component: Errors404Component
      },
      {
        path: '503',
        component: Error503Component
      },
      {
        path: '403',
        component: Error403Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
