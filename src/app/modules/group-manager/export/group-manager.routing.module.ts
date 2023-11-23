import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { AddGroupComponent } from '../add-group/add-group.component';
import { AddSessionsComponent } from '../add-sessions/add-sessions.component';

const groupManagerRoutes: Routes = [
  {
    path: 'add-group',
    component: AddGroupComponent,
  },
  {
    path: 'add-sessions',
    component: AddSessionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(groupManagerRoutes)],
  exports: [RouterModule],
})
export class GroupManagerRoutingModule {}
