import { Component, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../../auth/extensions/auth.service';
import { ProfileService } from '../../profile/extensions/profile.service';
import { SocialsLinks } from '../../profile/lecturer-profile/socials.model';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { FriendProfile } from './friend.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignalrService } from 'src/app/shared/services/chat.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnDestroy {
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

  friendProfile: FriendProfile = {
    id: 0,
    imageUrl: null,
    fullName: '',
    companies: '',
    subjects: '',
    groupCount: 0,
    email: '',
    facebook: null,
    instagram: null,
    linkedIn: null,
    twitter: null,
    website: null,
    youTube: null,
  };
  public _groups: any[] = [];

  public _bannerPictureFileName: string = '';
  public _bannerPicture: string = ``;
  private _unsubscribe = new Subject<void>();
  receiverUserId!: string;
  message!: string;
  messages: string[] = [];
  constructor(
    public _authService: AuthService,
    public profileService: ProfileService,
    private _modal: NzModalService,
    private _message: NzMessageService,
    private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _signalR: SignalrService
  ) {
    this._activatedRoute.params
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((params) => {
        const friendId = params['id'];
        if (friendId) {
          console.log(friendId);
          this._http
            .get(
              ServiceUrlBuilder.buildRootUrl(
                `Friends/get-friend-profile/${friendId}`
              )
            )
            .subscribe(
              (res: any) => {
                console.log(res);
                this.friendProfile = res;
              },
              (error) => {
                console.error('Error fetching friend profile:', error);
              }
            );
        }

        this.profileService
          .getBannerPicture(friendId)
          .subscribe((fileName: string) => {
            this._bannerPictureFileName = fileName;
            this._bannerPicture = `https://localhost:7273/Images/${this._bannerPictureFileName}`;
          });

        this.profileService
          .getProfilePicture(friendId)
          .subscribe((fileName: string) => {
            this._profilePictureFileName = fileName;
            this._profilePicture = `https://localhost:7273/Images/${this._profilePictureFileName}`;
          });
      });
  }
  ngOnInit() {
    this._signalR.startConnection();
    this._signalR.addReceiveMessageListener((senderId, message) => {
      this.messages.push(`From ${senderId}: ${message}`);
    });
  }

  sendMessage() {
    this._signalR.sendMessage(
      this.receiverUserId,
      this.message,
      this._authService.getLecturerId()
    );
    this.message = '';
  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
