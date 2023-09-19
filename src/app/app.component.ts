import { Component } from '@angular/core';
import { AuthService } from './modules/auth/extensions/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public _autService: AuthService) {}
}
