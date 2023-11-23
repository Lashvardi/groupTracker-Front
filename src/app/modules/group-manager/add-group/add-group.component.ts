import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/extensions/auth.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {
  groupForm: FormGroup;
  sessionForm: FormGroup;

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    private http: HttpClient
  ) {
    this.groupForm = new FormGroup({
      companyName: new FormControl('', Validators.required),
      groupName: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      status: new FormControl(0, Validators.required),
      sessionsAmount: new FormControl(0, Validators.required),
      startDate: new FormControl('', Validators.required),
      perWeek: new FormControl(0, Validators.required),
      isOnline: new FormControl(true, Validators.required),
    });

    this.sessionForm = new FormGroup({
      days: new FormControl([], Validators.required),
      time: new FormControl('', Validators.required),
      auditorium: new FormControl('', Validators.required),
      isOnline: new FormControl(true, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.groupForm.value);
    console.log(this.sessionForm.value);
    
  }
}
