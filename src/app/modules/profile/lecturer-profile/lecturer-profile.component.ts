import { Component } from '@angular/core';
import { AuthService } from '../../auth/extensions/auth.service';

@Component({
  selector: 'app-lecturer-profile',
  templateUrl: './lecturer-profile.component.html',
  styleUrls: ['./lecturer-profile.component.scss'],
})
export class LecturerProfileComponent {
  constructor(public _autService: AuthService) {}
}
