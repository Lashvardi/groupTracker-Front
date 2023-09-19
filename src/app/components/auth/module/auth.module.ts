import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AdditionalCompaniesStepComponent } from '../additional-companies-step/additional-companies-step.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthWrapperComponent } from '../extensions/auth-wrapper.component';
import { EmailValidator, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/directives/validators/password-match.validator.directive';
import { CustomEmailValidator } from 'src/app/directives/validators/email-validator.directive';
import { CustomPasswordValidator } from 'src/app/directives/validators/password-validator.directive';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AuthRoutingModule,
    NzModalModule,
    NzMessageModule,
    NzTagModule,
    NzIconModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdditionalCompaniesStepComponent,
    LoginComponent,
    RegisterComponent,
    AuthWrapperComponent,
    PasswordMatchValidator,
    CustomEmailValidator,
    CustomPasswordValidator,
  ],
})
export class AuthModule {}