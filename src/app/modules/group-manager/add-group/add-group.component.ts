import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth/extensions/auth.service';
import { GroupManagerSharedService } from '../extensions/group-manager-shared.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent {
  groupForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    private http: HttpClient,
    private groupManagerSharedService: GroupManagerSharedService
  ) {
    this.groupForm = new FormGroup({
      companyName: new FormControl('', Validators.required),
      groupName: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      status: new FormControl(0, Validators.required),
      sessionsAmount: new FormControl(0, Validators.required),
      hexColor: new FormControl('', Validators.required),
      groupType: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      perWeek: new FormControl(0, Validators.required),
      isOnline: new FormControl(true, Validators.required),
    });
  }

  onSubmit() {
    this.isLoading = true;
    let intSessionsAmount = parseInt(this.groupForm.value.sessionsAmount);
    let sessionsPerWeek = parseInt(this.groupForm.value.perWeek);
    this.groupForm.patchValue({
      sessionsAmount: intSessionsAmount,
      perWeek: sessionsPerWeek,
    });
    setTimeout(() => {
      this.isLoading = false;
      this.notification.success(
        'Success',
        'Now you can add sessions to this group'
      );
      this.groupManagerSharedService.setTempData(this.groupForm.value);
      this.groupForm.reset();
    }, 200);

    setTimeout(() => {
      this.groupManagerSharedService.redirectTo('/group-manager/add-sessions');
    }, 1500);
  }
}
