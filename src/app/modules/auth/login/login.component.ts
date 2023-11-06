import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PlaceholderDictionary } from 'src/app/models/PlaceholderDictionary';
import { AuthService } from '../extensions/auth.service';
import { ILecturerLogin } from '../extensions/lecturer-model';
import { fadeAnimation } from 'src/app/animations/animations';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation],
})
export class LoginComponent {
  lecturer: ILecturerLogin = {
    email: '',
    password: '',
  };

  placeholder: PlaceholderDictionary = {
    email: 'JohnDoe1934@gmail.com',
    password: '******',
  };

  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _message: NzNotificationService,
    private _router: Router
  ) {}
  Login() {
    this.isLoading = true;
    this._authService.loginLecturer(this.lecturer).subscribe({
      next: (data) => {
        this.isLoading = false;

        this._authService.setToken(data);
        setTimeout(() => {
          this._router.navigate(['/']);
        }, 200);
      },
      error: (err) => {
        this.isLoading = false;

        let errorMessage = 'An unknown error occurred';

        if (err && err.error) {
          try {
            const parsedError = JSON.parse(err.error);
            if (parsedError && parsedError.message) {
              errorMessage = parsedError.message;
            }
          } catch (e) {
            console.error('Could not parse error message:', e);
          }
        }

        this._message.error(`Login failed: ${errorMessage}`, 'Oops!');
        console.log(err);
      },
      complete: () => {},
    });
  }

  onFocus(event: FocusEvent): void {
    const element = event.target as HTMLInputElement;
    element.placeholder = '';
  }

  onBlur(event: FocusEvent): void {
    const element = event.target as HTMLInputElement;
    const name = element.getAttribute('name');
    if (name && Object.keys(this.placeholder).includes(name)) {
      element.placeholder = this.placeholder[name];
    }
  }
}
