import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/modules/auth/extensions/auth.service';
import { UploadProfilePictureComponent } from '../modals/upload-profile-picture.component';
import { HttpClient } from '@microsoft/signalr';
import { ProfileService } from 'src/app/modules/profile/extensions/profile.service';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.scss'],
})
export class InitialsAvatarComponent {
  private _fullName: string = '';
  showDropdown: boolean = false;
  public _profilePictureFileName: string = '';
  public _profilePicture: string = ``;
  constructor(
    private _authService: AuthService,
    private _modal: NzModalService,
    private _shared: SharedService
  ) {
    this._shared
      .getProfilePicture(this._authService.getLecturerId())
      .subscribe((fileName: string) => {
        this._profilePictureFileName = fileName;
        this._profilePicture = `https://localhost:7273/Images/${this._profilePictureFileName}`;
      });
  }

  @Input() size: 'big' | 'small' = 'small';

  @Input()
  set fullName(value: string) {
    this._fullName = value;
    this.initials = this.getInitials(value);
  }

  get fullName(): string {
    return this._fullName;
  }

  initials: string = '';

  private getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logOutAction() {
    // Logging out here!
    this._authService.logOut();
  }

  callDetailsModal() {
    this._modal.create({
      nzTitle: 'User Details',
      nzContent: UploadProfilePictureComponent,
      nzFooter: null,
    });
  }
}
