import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../extensions/auth.service';
import { ILecturerRegister } from '../extensions/lecturer-model';
import { fadeAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-teacher-subjects',
  templateUrl: './teacher-subjects.component.html',
  styleUrls: ['./teacher-subjects.component.scss'],
  animations: [fadeAnimation],
})
export class TeacherSubjectsComponent {
  Subjects: string[] = [];
  SubjectControl = new FormControl('', [Validators.required]);
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
    const value = this.SubjectControl.value;
    if ((value || '').trim()) {
      this.Subjects.push(value!.trim());
    }
    this.SubjectControl.reset();
  }

  isLoading: boolean = false;

  removeCompany(subject: string): void {
    this.Subjects = this.Subjects.filter((c) => c !== subject);
  }

  onSubmit(): void {
    const subjectsCSv = this.Subjects.join(', ');

    this._authService.setTempLecturerData({
      ...this.lecturer,
      subjects: subjectsCSv,
    });

    this.nextStep.emit();
  }
}
