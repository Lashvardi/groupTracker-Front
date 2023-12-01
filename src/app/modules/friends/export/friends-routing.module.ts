import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'search-friend',
    component: AddFriendComponent,
  },
  // path with id
  {
    path: 'friend-profile/:id',
    component: ViewProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule {}
