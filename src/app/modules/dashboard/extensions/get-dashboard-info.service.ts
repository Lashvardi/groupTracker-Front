import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
@Injectable({
  providedIn: 'root',
})
export class GetDashboardInfoService {
  constructor(private _http: HttpClient) {}

  tokenGetter() {
    return localStorage.getItem('token');
  }

  tokenDecoder() {
    const token = this.tokenGetter();

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const { email, unique_name, nameid } = decodedToken;
      return { email, unique_name, nameid };
    }

    return null;
  }

  getDashboardInfo() {
    this._http
      .get(
        ServiceUrlBuilder.buildGetSessionsForLecturerUrl(
          this.tokenDecoder()?.nameid
        )
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
