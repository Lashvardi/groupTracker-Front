import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsAvatarComponent } from './initials-avatar/initials-avatar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProfileRoutingModule } from '../modules/profile/export/profile-routing.module';
import { GroupCardComponent } from './group-card/group-card.component';
import { UploadProfilePictureComponent } from './modals/upload-profile-picture.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../modules/auth/extensions/auth.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UploadBannerPictureComponent } from './modals/upload-banner-picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FillSocialsComponent } from './modals/fill-socials.component';
import { UploadGroupComponent } from './modals/add-group.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    InitialsAvatarComponent,
    NavbarComponent,
    GroupCardComponent,
    GroupCardComponent,
    UploadProfilePictureComponent,
    UploadBannerPictureComponent,
    FillSocialsComponent,
    UploadGroupComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    ProfileRoutingModule,
    NzUploadModule,
    NzButtonModule,
    NzNotificationModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    HttpClientModule
    
  ],
  exports: [
    InitialsAvatarComponent,
    NavbarComponent,
    GroupCardComponent,
    UploadProfilePictureComponent,
    UploadBannerPictureComponent,
    FillSocialsComponent,
  ],
})
export class SharedModule {}
