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
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
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
  messages: any[] = [];
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
        this._http
          .get(
            ServiceUrlBuilder.buildRootUrl(
              `Friends/get-messages/${this._authService.getLecturerId()}/${friendId}`
            )
          )
          .subscribe((res: any) => {
            console.log(res);
            this.messages = res;
          });
      });

    this.startConnection();
  }
  public hubConnection!: HubConnection;

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7273/chatHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (senderId, message) => {
      console.log('ReceiveMessage', senderId, message);
      this.messages.push({ senderId, message });
      console.log(this.messages);
    });
  };

  public sendMessageRequest = (
    senderId: string,
    receiverUserId: string,
    message: string
  ) => {
    this.hubConnection
      .invoke('SendMessage', receiverUserId, message, senderId)
      .catch((err) => console.error(err));
  };

  public sendMessage = () => {
    console.log(this.receiverUserId, this.message);
    const senderId = this._authService.getLecturerId();
    this.receiverUserId = this.friendProfile.id.toString();
    this.sendMessageRequest(senderId, this.receiverUserId, this.message);
    this.message = '';
  };
  public isCurrentUser(senderId: string): boolean {
    const isCurrentUser = senderId === this._authService.getLecturerId();
    console.log(
      `isCurrentUser: ${isCurrentUser}, senderId: ${senderId}, currentUserId: ${this._authService.getLecturerId()}`
    );
    return isCurrentUser;
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
