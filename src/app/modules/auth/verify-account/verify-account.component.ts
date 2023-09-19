import { Component } from '@angular/core';
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
  isLoading: boolean = false;
  constructor(
    private _authService: AuthService,
    private _message: NzMessageService,
    private _router: Router
  ) {
    this._authService.finalizeRegistration().subscribe({
      next: (data) => {
        this.isLoading = false;
        this._message.success("You've successfully registered!");
        setTimeout(() => {
          this._router.navigate(['/auth/Login']);
        }, 200);
      },
      error: (err) => {
        this.isLoading = false;
        if (err && err.error && err.error.message) {
          this._message.error(`Registration failed: ${err.error.message}`);
        } else {
          this._message.error(`Registration failed: ${err.message}`);
        }
        console.log(err);
      },
      complete: () => {},
    });
  }
}
