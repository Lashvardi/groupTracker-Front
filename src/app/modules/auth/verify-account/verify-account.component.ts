import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../extensions/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  animations: [fadeAnimation],
})
export class VerifyAccountComponent {
  isLoading = false;
  verificationCode!: string;

  constructor(
    private _authService: AuthService,
    private _message: NzMessageService,
    private _router: Router
  ) {}

  verifyCode() {
    this.isLoading = true;
    // Verify the code through your AuthService
    this._authService.verifyAccount(this.verificationCode).subscribe(
      (res) => {
        this.isLoading = false;
        this._message.success('Account verified successfully.');
        this._router.navigate(['/dashboard']);
      },
      (err) => {
        this.isLoading = false;
        this._message.error('Verification failed. Please try again.');
      }
    );
  }
}
