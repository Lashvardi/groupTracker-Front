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
    subjects: '',
    email: '',
    password: '',
    companies: '',
  };

  @Output() nextStep = new EventEmitter<void>();
  constructor(
    private _authService: AuthService,
    private _message: NzMessageService
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
        console.log(data);
        this.nextStep.emit();
      },
      error: (err) => {
        console.log(err);
        this._message.error(err.error);
      },
      complete: () => {
        console.log('complete');
        this.nextStep.emit();
      },
    });
  }
}
