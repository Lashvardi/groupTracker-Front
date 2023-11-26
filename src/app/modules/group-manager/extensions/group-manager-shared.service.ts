import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

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
}
