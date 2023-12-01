import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { InitialsAvatarComponent } from 'src/app/shared/initials-avatar/initials-avatar.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzMessageModule,
    NzTagModule,
    NzIconModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SharedModule,
    FriendsRoutingModule,
    NzGridModule,
  ],
  declarations: [AddFriendComponent, ViewProfileComponent],
})
export class FriendsModule {}
