import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { AddGroupComponent } from '../add-group/add-group.component';

const routes: Routes = [
  {
    path: 'add-group',
    component: AddGroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupManagerRoutingModule {}
