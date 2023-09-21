import { Component, EventEmitter, Output } from '@angular/core';
import { PlaceholderDictionary } from 'src/app/models/PlaceholderDictionary';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from 'src/app/animations/animations';
import { AuthService } from '../extensions/auth.service';
import { ILecturerRegister } from '../extensions/lecturer-model';
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
    subjects: '',
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
