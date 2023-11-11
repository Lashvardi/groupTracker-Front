import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/export/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/export/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'group-manager',
    loadChildren: () =>
      import('./modules/group-manager/export/group-manager.module').then(
        (m) => m.GroupManagerModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/export/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
