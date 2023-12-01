import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './modules/auth/extensions/auth.service';
import { filter, map } from 'rxjs';
import { SignalrService } from './shared/services/chat.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentRoute!: string;
  public hubConnection!: HubConnection;

  constructor(
    public _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _signalR: SignalrService
  ) {}

  // get the current route data
}
