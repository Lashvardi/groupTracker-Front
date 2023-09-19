import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { ILecturer } from './lecturer-model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  registerLecturer(lecturerData: ILecturer): Observable<ILecturer> {
    return this._http.post<ILecturer>(
      ServiceUrlBuilder.buildRootUrl('Lecturer/Register'),
      lecturerData
    );
  }
}
