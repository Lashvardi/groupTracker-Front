import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceUrlBuilder } from 'src/ServiceUrlBuilder';
import { AuthService } from 'src/app/modules/auth/extensions/auth.service';
import { ProfileService } from 'src/app/modules/profile/extensions/profile.service';

@Component({
  selector: 'app-fill-socials',
  template: `
    <h4>We've detected that you dont have filled out your socials</h4>
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
                formControlName="youTubeLink"
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
  addSocialLinks(lecturerId: string, socialLinks: any) {
    return this._http.put(
      ServiceUrlBuilder.buildRootUrl(`Lecturer/add-socials/${lecturerId}`),
      socialLinks
    );
  }
  constructor(
    private fb: FormBuilder,
    private _http: HttpClient,
    private _authService: AuthService
  ) {
    this.socialLinksForm = this.fb.group({
      facebookLink: [''],
      twitterLink: [''],
      instagramLink: [''],
      linkedInLink: [''],
      youTubeLink: [''],
      personalWebsiteLink: [''],
    });

    // this.socialLinksForm.setValue({
    //   facebookLink: 'https://www.facebook.com/your-profile',
    //   twitterLink: 'https://www.twitter.com/your-profile',
    //   instagramLink: 'https://www.instagram.com/your-profile',
    //   linkedInLink: 'https://www.linkedin.com/your-profile',
    //   youtubeLink: 'https://www.youtube.com/your-profile',
    //   personalWebsiteLink: 'https://www.your-website.com',
    // });

    // get socials
    this._http
      .get(
        ServiceUrlBuilder.buildRootUrl(
          `Lecturer/get-socials/${this._authService.getLecturerId()}`
        )
      )
      .subscribe((socials: any) => {
        console.log(socials);
        this.socialLinksForm.patchValue({
          facebookLink: socials.facebookLink,
          twitterLink: socials.twitterLink,
          instagramLink: socials.instagramLink,
          linkedInLink: socials.linkedInLink,
          youTubeLink: socials.youTubeLink,
          personalWebsiteLink: socials.personalWebsiteLink,
        });
      });
  }

  submitForm(): void {
    console.log(this.socialLinksForm.value);

    this.addSocialLinks(
      this._authService.getLecturerId(),
      this.socialLinksForm.value
    ).subscribe((res) => {
      console.log(res);
    });
  }
}
