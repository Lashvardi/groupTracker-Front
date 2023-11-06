import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../extensions/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/animations/animations';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  animations: [fadeAnimation],
})
export class VerifyAccountComponent {
  isLoading = false;
  verificationCode!: string;
  email?: string = '' || this._authService.getTempLecturerData()?.email;

  constructor(
    private _authService: AuthService,
    private _message: NzNotificationService,
    private _router: Router
  ) {
    this.email = this._authService.getTempLecturerData()?.email;
  }

  verifyCode() {
    this.isLoading = true;
    // Verify the code through your AuthService
    this._authService
      .verifyAccount(this.email, this.verificationCode)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this._message.success("You've successfully registered!", 'Success!');

          setTimeout(() => {
            this._router.navigate(['/auth/Login']);
          }, 200);
        },
        (err) => {
          this.isLoading = false;
          this._message.error(
            'Verification failed. Please try again.',
            'Oops!'
          );
        }
      );
  }
}
