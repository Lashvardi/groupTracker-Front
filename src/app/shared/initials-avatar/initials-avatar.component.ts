import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/extensions/auth.service';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.scss'],
})
export class InitialsAvatarComponent {
  private _fullName: string = '';
  showDropdown: boolean = false;
  constructor(private _authService: AuthService) {}

  @Input()
  set fullName(value: string) {
    this._fullName = value;
    this.initials = this.getInitials(value);
  }

  get fullName(): string {
    return this._fullName;
  }

  initials: string = '';

  private getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  logOutAction() {
    // Logging out here!
    this._authService.logOut();
  }
}
