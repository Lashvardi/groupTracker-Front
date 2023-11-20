import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/extensions/auth.service';

@Component({
  selector: 'app-upload-profile-picture',
  template: `
    <h1>Upload Profile Picture</h1>
    <nz-upload
      [nzAction]="uploadUrl"
      [nzBeforeUpload]="beforeUpload"
      (nzChange)="handleChange($event)"
    >
      <button nz-button><i nz-icon nzType="upload"></i> Click to Upload</button>
    </nz-upload>
    <button (click)="handleDelete()" nz-button nzType="primary" nzDanger="">
      Delete Image
    </button>
  `,
  styles: [],
})
export class UploadProfilePictureComponent {
  constructor(
    private _authService: AuthService,
    private _notification: NzNotificationService,
    private _http: HttpClient
  ) {}
  uploadUrl: string = `https://localhost:7273/Lecturer/upload-profile-picture/${this._authService.getLecturerId()}`;
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this._notification.error(
          'Profile Picture Upload Failed',
          'Your profile picture must be smaller than 2MB!'
        );
        observer.complete();
        return;
      }
      observer.next(isLt2M);
      observer.complete();
    });
  handleChange(info: { file: NzUploadFile }): void {
    // Handle the upload process, response or errors here
    if (info.file.status === 'done') {
      this._notification.success(
        'Profile Picture Uploaded',
        'Your profile picture has been uploaded successfully!'
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log(info.file.response);
    } else if (info.file.status === 'error') {
      this._notification.error(
        'Profile Picture Upload Failed',
        'Your profile picture could not be uploaded!'
      );
      console.log(info.file.response);
    }
  }

  handleDelete() {
    this._http
      .delete(
        `https://localhost:7273/Lecturer/delete-profile-picture/${this._authService.getLecturerId()}`
      )
      .subscribe((res: any) => {
        this._notification.success(
          'Profile Picture Deleted',
          'Your profile picture has been deleted successfully!'
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  }
}
