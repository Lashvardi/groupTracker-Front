import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { ILecturerLogin, ILecturerRegister, IToken } from './lecturer-model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  private tempLecturerData: ILecturerRegister | null = null;
  private readonly TOKEN_KEY = 'token';

  registerLecturer(
    lecturerData: ILecturerRegister
  ): Observable<ILecturerRegister> {
    return this._http.post<ILecturerRegister>(
      ServiceUrlBuilder.buildRootUrl('Lecturer/Register'),
      lecturerData
    );
  }

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

  verifyAccount(code: string): Observable<any> {
    return of({ success: true });
  }

  setTempLecturerData(lecturerData: ILecturerRegister): void {
    this.tempLecturerData = lecturerData;
  }

  getTempLecturerData(): ILecturerRegister | null {
    return this.tempLecturerData;
  }

  finalizeRegistration(): Observable<ILecturerRegister> {
    if (this.tempLecturerData) {
      return this.registerLecturer(this.tempLecturerData);
    }
    throw new Error('No data to send');
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
