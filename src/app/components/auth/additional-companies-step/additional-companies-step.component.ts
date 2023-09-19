import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fadeAnimation } from '../../../animations/animations';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AuthService } from '../extensions/auth.service';
import { ILecturerRegister } from '../extensions/lecturer-model';

@Component({
  selector: 'app-additional-companies-step',
  templateUrl: './additional-companies-step.component.html',
  styleUrls: ['./additional-companies-step.component.scss'],
  animations: [fadeAnimation],
})
export class AdditionalCompaniesStepComponent {
  Companies: string[] = [];
  companyControl = new FormControl('', [Validators.required]);
  lecturer: ILecturerRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companies: '',
  };

  constructor(
    private _authService: AuthService,
    private _message: NzMessageService,
    private _router: Router
  ) {
    this.lecturer =
      this._authService.getTempLecturerData() as ILecturerRegister;
  }
  addCompany(): void {
    const value = this.companyControl.value;
    if ((value || '').trim()) {
      this.Companies.push(value!.trim());
    }
    this.companyControl.reset();
  }

  isLoading: boolean = false;

  removeCompany(company: string): void {
    this.Companies = this.Companies.filter((c) => c !== company);
  }

  onSubmit(): void {
    const companiesCsv = this.Companies.join(', ');

    this._authService.setTempLecturerData({
      ...this.lecturer,
      companies: companiesCsv,
    });

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
