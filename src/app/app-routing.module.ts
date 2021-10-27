import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './core/guards/app-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppAuthGuard],
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule)
  },
  { path: '**', redirectTo: 'error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
