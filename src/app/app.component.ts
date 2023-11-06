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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentRoute!: string;

  constructor(
    public _authService: AuthService,
    private _activatedRoute: ActivatedRoute
  ) {}

  // get the current route data
}
