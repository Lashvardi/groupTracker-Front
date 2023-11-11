import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsAvatarComponent } from './initials-avatar/initials-avatar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProfileRoutingModule } from '../modules/profile/export/profile-routing.module';
import { GroupCardComponent } from './group-card/group-card.component';

@NgModule({
  declarations: [
    InitialsAvatarComponent,
    NavbarComponent,
    GroupCardComponent,
    GroupCardComponent,
  ],
  imports: [CommonModule, NzModalModule, ProfileRoutingModule],
  exports: [InitialsAvatarComponent, NavbarComponent, GroupCardComponent],
})
export class SharedModule {}
