import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/extensions/auth.service';

@Component({
  selector: 'app-group',
  template: `
    <!-- Group Form -->
    <form [formGroup]="groupForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          formControlName="companyName"
          required
        />
      </div>

      <div>
        <label for="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          formControlName="groupName"
          required
        />
      </div>

      <div>
        <label for="grade">Grade:</label>
        <input type="text" id="grade" formControlName="grade" required />
      </div>

      <div>
        <label for="status">Status:</label>
        <input type="number" id="status" formControlName="status" required />
      </div>

      <div>
        <label for="sessionsAmount">Sessions Amount:</label>
        <input
          type="number"
          id="sessionsAmount"
          formControlName="sessionsAmount"
          required
        />
      </div>

      <div>
        <label for="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          formControlName="startDate"
          required
        />
      </div>

      <div>
        <label for="perWeek">Sessions Per Week:</label>
        <input type="number" id="perWeek" formControlName="perWeek" required />
      </div>

      <div>
        <label for="isOnline">Is Online:</label>
        <input type="checkbox" id="isOnline" formControlName="isOnline" />
      </div>

      <button type="submit">Submit Group</button>
    </form>

    <!-- Session Form -->
    <form [formGroup]="sessionForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="days">Days:</label>
        <select formControlName="days" multiple>
          <option value="0">Sunday</option>
          <option value="1">Monday</option>
          <!-- Add options for each day of the week -->
        </select>
      </div>

      <div>
        <label for="time">Time:</label>
        <input type="time" id="time" formControlName="time" required />
      </div>

      <div>
        <label for="auditorium">Auditorium:</label>
        <input
          type="text"
          id="auditorium"
          formControlName="auditorium"
          required
        />
      </div>

      <div>
        <label for="isOnlineSession">Is Online:</label>
        <input
          type="checkbox"
          id="isOnlineSession"
          formControlName="isOnline"
        />
      </div>

      <button type="submit">Submit Session</button>
    </form>
  `,
  styles: [],
})
export class UploadGroupComponent {
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
    // Handle form submission
  }
}
