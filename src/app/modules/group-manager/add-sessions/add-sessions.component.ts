import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/extensions/auth.service';

@Component({
  selector: 'app-add-sessions',
  templateUrl: './add-sessions.component.html',
  styleUrls: ['./add-sessions.component.scss'],
})
export class AddSessionsComponent {
  sessionForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    private http: HttpClient
  ) {
    this.sessionForm = new FormGroup({
      days: new FormControl([], Validators.required),
      time: new FormControl('', Validators.required),
      auditorium: new FormControl('', Validators.required),
      isOnline: new FormControl(true, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.sessionForm.value);
  }
}
