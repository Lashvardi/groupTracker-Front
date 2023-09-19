import { Directive, forwardRef, Renderer2, ElementRef, HostListener } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector:
    '[customEmail][formControlName],[customEmail][formControl],[customEmail][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomEmailValidator),
      multi: true,
    },
  ],
})
export class CustomEmailValidator implements Validator {
  private isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus')
  activate() {
    this.isActive = true;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.isActive) return null;

    const value = control.value;
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      value
    );

    if (valid) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'white');
      return null;
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'red');
      return { customEmail: true };
    }
  }
}
