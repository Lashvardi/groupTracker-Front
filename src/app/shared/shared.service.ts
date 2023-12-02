import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { AuthService } from '../modules/auth/extensions/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  addSocialLinks(lecturerId: string, socialLinks: any) {
    return this._http.put(
      ServiceUrlBuilder.buildRootUrl(`Lecturer/add-socials/${lecturerId}`),
      socialLinks
    );
  }

  getSocialLinks(lecturerId: string) {
    return this._http.get(
      ServiceUrlBuilder.buildRootUrl(
        `Lecturer/get-socials/${this._authService.getLecturerId()}`
      )
    );
  }

  getProfilePicture(lecturerId: string) {
    return this._http.get(
      ServiceUrlBuilder.buildRootUrl(`Lecturer/profile-picture/${lecturerId}`),
      { responseType: 'text' } // Expecting text response
    );
  }
}
