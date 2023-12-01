import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { AuthService } from '../../auth/extensions/auth.service';
import { Friend } from './friend.interface';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent {
  friends: Friend[] = [];
  constructor(private _http: HttpClient, private _auth: AuthService) {
    this._http
      .get(
        ServiceUrlBuilder.buildRootUrl(
          `Friends/get-other-lecturers-with-similar-interests-and-skills/${this._auth.getLecturerId()}`
        )
      )
      .subscribe((res: any) => {
        this.friends = res;
      });
  }
}
