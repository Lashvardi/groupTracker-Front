import { Component, EventEmitter, Output } from '@angular/core';
import { PlaceholderDictionary } from 'src/app/models/PlaceholderDictionary';
import { ILecturerRegister } from '../lecturer-model';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/animations/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAnimation],
})
export class RegisterComponent {
  lecturer: ILecturerRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companies: '',
  };

  placeholder: PlaceholderDictionary = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe1934@gmail.com',
    password: '******',
    confirmPassword: '******',
  };

  _confirmPassword: string = '';
  isLoading: boolean = false;

  currentStep: number = 1;
  @Output() nextStep = new EventEmitter<void>();

  constructor(
    private _authService: AuthService,
    private _message: NzMessageService,
    private _router: Router
  ) {}
  Authorize() {
    this.isLoading = true;

    this._authService.setTempLecturerData(this.lecturer);

    this.nextStep.emit();

    this.isLoading = false;

    // this._authService.registerLecturer(this.lecturer).subscribe({
    //   next: (data) => {
    //     this.isLoading = false;
    //     this._message.success("You've successfully registered!");
    //     setTimeout(() => {
    //       this._router.navigate(['/auth/Login']);
    //     }, 200);
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     if (err && err.error && err.error.message) {
    //       this._message.error(`Registration failed: ${err.error.message}`);
    //     } else {
    //       this._message.error(`Registration failed: ${err.message}`);
    //     }
    //     console.log(err);
    //   },
    //   complete: () => {},
    // });
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
