import { VerifyAccountComponent } from './../verify-account/verify-account.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-wrapper',
  template: `
    <div>
      <ng-container *ngIf="currentStep === 1">
        <app-register (nextStep)="goToStep(2)"></app-register>
      </ng-container>

      <ng-container *ngIf="currentStep === 2">
        <app-additional-companies-step
          (nextStep)="goToStep(3)"
        ></app-additional-companies-step>
      </ng-container>

      <ng-container *ngIf="currentStep === 3">
        <app-verify-account></app-verify-account>
      </ng-container>
    </div>
  `,
})
export class AuthWrapperComponent {
  currentStep = 1;

  goToStep(step: number) {
    this.currentStep = step;
  }
}
