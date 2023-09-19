import {
  Directive,
  forwardRef,
  Renderer2,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector:
    '[passwordMatch][formControlName],[passwordMatch][formControl],[passwordMatch][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordMatchValidator),
      multi: true,
    },
  ],
})
export class PasswordMatchValidator implements Validator {
  private isActive: boolean = false;

  @Input('passwordMatch') expectedPassword!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus')
  activate() {
    this.isActive = true;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.isActive || !this.expectedPassword) return null;

    const value = control.value;

    if (value === this.expectedPassword) {
      this.renderer.removeClass(this.el.nativeElement, 'invalid-border');
      this.renderer.addClass(this.el.nativeElement, 'valid-border');
      return null;
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'valid-border');
      this.renderer.addClass(this.el.nativeElement, 'invalid-border');
      return { passwordMatch: true };
    }
  }
}
