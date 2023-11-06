import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsAvatarComponent } from './initials-avatar/initials-avatar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProfileRoutingModule } from '../modules/profile/export/profile-routing.module';

@NgModule({
  declarations: [InitialsAvatarComponent, NavbarComponent],
  imports: [CommonModule, NzModalModule, ProfileRoutingModule],
  exports: [InitialsAvatarComponent, NavbarComponent],
})
export class SharedModule {}
