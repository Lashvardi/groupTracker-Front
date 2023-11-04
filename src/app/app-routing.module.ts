import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HomeComponent } from './modules/dashboard/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/export/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/export/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/group-manager/export/group-manager.module').then(
        (m) => m.GroupManagerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
