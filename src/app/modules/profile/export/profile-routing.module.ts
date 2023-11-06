import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { LecturerProfileComponent } from '../lecturer-profile/lecturer-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LecturerProfileComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
