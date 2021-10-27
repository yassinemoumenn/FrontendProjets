import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from 'src/app/core/guards/app-auth.guard';
import { CertificateComponent } from './certificate/certificate.component';
import { SignerComponent } from './signer.component';

const routes: Routes = [
  {
    path: '',
    component: SignerComponent,
    canActivate: [AppAuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'certificates', component: CertificateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignerRoutingModule {}
