import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fill-socials',
  template: `
    <form
      [formGroup]="socialLinksForm"
      (ngSubmit)="submitForm()"
      class="social-links-form"
    >
      <div nz-row nzGutter="16">
        <!-- Facebook Link -->
        <div nz-col nzSpan="24" nzMd="12">
          <nz-form-item>
            <nz-form-control>
              <input
                nz-input
                placeholder="Facebook URL"
                formControlName="facebookLink"
                id="facebookLink"
              />
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col nzSpan="24" nzMd="12">
          <nz-form-item>
            <nz-form-control>
              <input
                placeholder="Twitter URL"
                nz-input
                formControlName="twitterLink"
                id="twitterLink"
              />
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col nzSpan="24" nzMd="12">
          <nz-form-item>
            <nz-form-control>
              <input
                placeholder="Instagram URL"
                nz-input
                formControlName="instagramLink"
                id="instagramLink"
              />
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col nzSpan="24" nzMd="12">
          <nz-form-item>
            <nz-form-control>
              <input
                placeholder="LinkedIn URL"
                nz-input
                formControlName="linkedInLink"
                id="linkedInLink"
              />
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col nzSpan="24" nzMd="12">
          <nz-form-item>
            <nz-form-control>
              <input
                nz-input
                placeholder="Youtube URL"
                formControlName="youtubeLink"
                id="youtubeLink"
              />
            </nz-form-control>
          </nz-form-item>
        </div>
        <div nz-col nzSpan="24" nzMd="12">
          <nz-form-item>
            <nz-form-control>
              <input
                nz-input
                placeholder="Personal Website URL"
                formControlName="personalWebsiteLink"
                id="personalWebsiteLink"
              />
            </nz-form-control>
          </nz-form-item>
        </div>
        <!-- Additional fields similarly... -->
      </div>
      <button nz-button nzType="primary" [disabled]="!socialLinksForm.valid">
        Submit
      </button>
    </form>
  `,
  styles: [
    `
      .social-links-form {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
      }

      .nz-form-item {
        margin-bottom: 16px;
      }

      .form-footer {
        text-align: center;
        margin-top: 20px;
      }

      button[nz-button] {
        width: 150px;
        height: 40px;
        font-size: 16px;
      }
    `,
  ],
})
export class FillSocialsComponent {
  socialLinksForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.socialLinksForm = this.fb.group({
      facebookLink: [''],
      twitterLink: [''],
      instagramLink: [''],
      linkedInLink: [''],
      youtubeLink: [''],
      personalWebsiteLink: [''],
    });

    this.socialLinksForm.setValue({
      facebookLink: 'https://www.facebook.com/your-profile',
      twitterLink: 'https://www.twitter.com/your-profile',
      instagramLink: 'https://www.instagram.com/your-profile',
      linkedInLink: 'https://www.linkedin.com/your-profile',
      youtubeLink: 'https://www.youtube.com/your-profile',
      personalWebsiteLink: 'https://www.your-website.com',
    });
  }

  submitForm(): void {
    console.log('Social Links:', this.socialLinksForm.value);
  }
}
