import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from './group.model';

@Injectable({
  providedIn: 'root',
})
export class CreateGroupService {
  constructor(private _http: HttpClient) {}
}
