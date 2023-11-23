import { Component } from '@angular/core';
import { AuthService } from '../../auth/extensions/auth.service';
import { ProfileService } from '../extensions/profile.service';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UploadProfilePictureComponent } from 'src/app/shared/modals/upload-profile-picture.component';
import { UploadBannerPictureComponent } from 'src/app/shared/modals/upload-banner-picture.component';
import { FillSocialsComponent } from 'src/app/shared/modals/fill-socials.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/shared/shared.service';
import { SocialsLinks } from './socials.model';
import { UploadGroupComponent } from 'src/app/shared/modals/add-group.component';

@Component({
  selector: 'app-lecturer-profile',
  templateUrl: './lecturer-profile.component.html',
  styleUrls: ['./lecturer-profile.component.scss'],
})
export class LecturerProfileComponent {
  public _profilePictureFileName: string = '';
  public _profilePicture: string = ``;
  public _socialLinks: SocialsLinks = {
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    linkedInLink: '',
    youTubeLink: '',
    personalWebsiteLink: '',
  };

  public _bannerPictureFileName: string = '';
  public _bannerPicture: string = ``;
  constructor(
    public _authService: AuthService,
    public profileService: ProfileService,
    private _modal: NzModalService,
    private _message: NzMessageService
  ) {
    // In your component
    this.profileService
      .getProfilePicture(_authService.getLecturerId())
      .subscribe((fileName: string) => {
        this._profilePictureFileName = fileName;
        this._profilePicture = `https://localhost:7273/Images/${this._profilePictureFileName}`;
      });

    this.profileService
      .getBannerPicture(_authService.getLecturerId())
      .subscribe((fileName: string) => {
        this._bannerPictureFileName = fileName;
        this._bannerPicture = `https://localhost:7273/Images/${this._bannerPictureFileName}`;
      });

    this.profileService
      .hasFilledOutSocials(_authService.getLecturerId())
      .subscribe((hasFilledOutSocials) => {
        if (!hasFilledOutSocials) {
          this._modal.create({
            nzTitle: 'Socials',
            nzContent: FillSocialsComponent,
            nzFooter: null,
          });
        } else {
          // this was for testing purposes
          // this._modal.create({
          //   nzTitle: 'Socials',
          //   nzContent: 'You have filled out your socials!',
          //   nzFooter: null,
          // });

          this._message.info('You have filled out your socials!');
        }
      });

    this._message.success('Profile Loaded Successfully!');

    this.profileService
      .getSocialLinks(this._authService.getLecturerId())
      .subscribe((socialLinks: any) => {
        this._socialLinks = socialLinks;
        console.log(this._socialLinks);
      });
  }

  callUploadModal() {
    this._modal.create({
      nzTitle: 'Upload Profile Picture',
      nzContent: UploadProfilePictureComponent,
      nzFooter: null,
    });
  }

  callBannerEditModal() {
    this._modal.create({
      nzTitle: 'Upload Banner Picture',
      nzContent: UploadBannerPictureComponent,
      nzFooter: null,
    });
  }

  callSocialsEditModal() {
    this._modal.create({
      nzTitle: 'Socials',
      nzContent: FillSocialsComponent,
      nzFooter: null,
    });
  }


}
