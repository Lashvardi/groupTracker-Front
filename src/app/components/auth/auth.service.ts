import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { ILecturerLogin, ILecturerRegister, IToken } from './lecturer-model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  registerLecturer(
    lecturerData: ILecturerRegister
  ): Observable<ILecturerRegister> {
    return this._http.post<ILecturerRegister>(
      ServiceUrlBuilder.buildRootUrl('Lecturer/Register'),
      lecturerData
    );
  }

  // https://localhost:7273/Lecturer/login?email=lashadev0%40gmail.com&password=Rokorato123

  loginLecturer(lecturerData: ILecturerLogin): Observable<string> {
    const url = ServiceUrlBuilder.buildLoginUrl(
      lecturerData.email,
      lecturerData.password
    );
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const options = {
      headers,
      responseType: 'text' as 'json',
    };

    return this._http.post<string>(url, {}, options);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
