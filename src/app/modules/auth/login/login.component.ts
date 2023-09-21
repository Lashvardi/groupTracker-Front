import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PlaceholderDictionary } from 'src/app/models/PlaceholderDictionary';
import { AuthService } from '../extensions/auth.service';
import { ILecturerLogin } from '../extensions/lecturer-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    private _message: NzMessageService,
    private _router: Router
  ) {}
  Login() {
    this.isLoading = true;
    this._authService.loginLecturer(this.lecturer).subscribe({
      next: (data) => {
        this.isLoading = false;
        this._message.success(data);
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
            // Try to parse the JSON string into an object
            const parsedError = JSON.parse(err.error);
            // If the object has a 'message' property, use it
            if (parsedError && parsedError.message) {
              errorMessage = parsedError.message;
            }
          } catch (e) {
            // If parsing fails, log the exception but don't change the errorMessage
            console.error("Could not parse error message:", e);
          }
        }

        this._message.error(`Login failed: ${errorMessage}`);
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