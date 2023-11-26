import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';

@Injectable({
  providedIn: 'root',
})
export class GroupManagerSharedService {
  temData: any;
  constructor(private _http: HttpClient, private router: Router) {}

  setTempData(data: any) {
    this.temData = data;
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  getTempData() {
    return of(this.temData);
  }

  sendData(data: any, lecturerId: string) {
    return this._http.post(
      ServiceUrlBuilder.buildRootUrl(`Group/create-and-assign?lecturerId=${lecturerId}`),
      data
    );
  }
}
