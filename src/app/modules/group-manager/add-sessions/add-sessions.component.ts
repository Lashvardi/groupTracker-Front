import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/extensions/auth.service';
import { GroupManagerSharedService } from '../extensions/group-manager-shared.service';

@Component({
  selector: 'app-add-sessions',
  templateUrl: './add-sessions.component.html',
  styleUrls: ['./add-sessions.component.scss'],
})
export class AddSessionsComponent {
  sessionForm: FormGroup;
  tempData: any;
  isLoading = false;
  timeStart: any;
  timeEnd: any;
  dataToSend: any;
  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    private http: HttpClient,
    private groupManagerSharedService: GroupManagerSharedService
  ) {
    this.sessionForm = new FormGroup({
      days: new FormControl([], Validators.required),
      time: new FormControl('', Validators.required),
      auditorium: new FormControl('', Validators.required),
      isOnline: new FormControl(true, Validators.required),
    });
    let timeFormed = `${this.timeStart}:00 - ${this.timeEnd}:00`;
    this.sessionForm.patchValue({
      time: timeFormed,
    });

    this.groupManagerSharedService.getTempData().subscribe((data) => {
      this.tempData = data;
    });
  }
  updateTime() {
    let timeFormed = `${this.timeStart}:00 - ${this.timeEnd}:00`;
    this.sessionForm.patchValue({
      time: timeFormed,
    });
  }
  onSubmit() {
    console.log(this.sessionForm.value);
    let intDays = this.sessionForm.value.days.map((day: any) => {
      return parseInt(day);
    });
    this.sessionForm.patchValue({
      days: intDays,
    });
    this.dataToSend = {
      group: {
        ...this.tempData,
      },
      session: {
        ...this.sessionForm.value,
      },
    };

    this.groupManagerSharedService
      .sendData(this.dataToSend, this.authService.getLecturerId())
      .subscribe((res) => {
        console.log(res);
      });
    console.log(this.dataToSend);
    this.isLoading = true;
  }
}
