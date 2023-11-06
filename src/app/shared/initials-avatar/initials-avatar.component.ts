import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-initials-avatar',
  templateUrl: './initials-avatar.component.html',
  styleUrls: ['./initials-avatar.component.scss'],
})
export class InitialsAvatarComponent {
  private _fullName: string = '';

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
}
