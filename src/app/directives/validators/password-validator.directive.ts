import { Directive, forwardRef, Renderer2, ElementRef, HostListener } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector:
    '[customPassword][formControlName],[customPassword][formControl],[customPassword][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomPasswordValidator),
      multi: true,
    },
  ],
})
export class CustomPasswordValidator implements Validator {
  private isActive: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus')
  activate() {
    this.isActive = true;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.isActive) return null;

    const value = control.value;
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);

    if (valid) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'white');
      return null;
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'red');
      return { customPassword: true };
    }
  }
}
