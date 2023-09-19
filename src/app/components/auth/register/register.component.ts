import { Component } from '@angular/core';
import { PlaceholderDictionary } from 'src/app/models/PlaceholderDictionary';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  _firstName: string = '';
  _lastName: string = '';
  _email: string = '';
  _password: string = '';
  isLoading: boolean = false;

  placeholder: PlaceholderDictionary = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'JohnDoe1934@gmail.com',
    password: '******',
  };

  Authorize() {


    this.isLoading = true;
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
