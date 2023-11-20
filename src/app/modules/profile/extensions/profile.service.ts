import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private _http: HttpClient) {}
  private _profilePictureFileName: string = '';
  private _profilePicture: string = `https://localhost:7273/${this._profilePictureFileName}}`;

  getProfilePicture(lecturerId: string) {
    return this._http.get(
      ServiceUrlBuilder.buildRootUrl(`Lecturer/profile-picture/${lecturerId}`),
      { responseType: 'text' } // Expecting text response
    );
  }

  getBannerPicture(lecturerId: string) {
    return this._http.get(
      ServiceUrlBuilder.buildRootUrl(`Lecturer/banner-picture/${lecturerId}`),
      { responseType: 'text' } // Expecting text response
    );
  }

  get profilePicture() {
    return this._profilePicture;
  }

  hasFilledOutSocials(lecturerId: string) {
    return this._http.get(
      ServiceUrlBuilder.buildRootUrl(
        `Lecturer/has-filled-out-socials/${lecturerId}`
      ),
    );
  }
}
