import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fadeAnimation } from '../../../animations/animations';

@Component({
  selector: 'app-additional-companies-step',
  templateUrl: './additional-companies-step.component.html',
  styleUrls: ['./additional-companies-step.component.scss'],
  animations: [fadeAnimation],
})
export class AdditionalCompaniesStepComponent {
  Companies: string[] = [];
  companyControl = new FormControl('', [Validators.required]);
  @Output() nextStep = new EventEmitter<void>();

  addCompany(): void {
    const value = this.companyControl.value;
    if ((value || '').trim()) {
      this.Companies.push(value!.trim());
    }
    this.companyControl.reset();
  }

  removeCompany(company: string): void {
    this.Companies = this.Companies.filter((c) => c !== company);
  }

  onSubmit(): void {
    const companiesCsv = this.Companies.join(', ');
    console.log(companiesCsv);
  }
}
