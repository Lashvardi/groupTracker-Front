import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// NG ZORRO
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CustomEmailValidator } from './directives/validators/email-validator.directive';
import { CustomPasswordValidator } from './directives/validators/password-validator.directive';
import { AuthService } from './components/auth/auth.service';
import { PasswordMatchValidator } from './directives/validators/password-match.validator.directive';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CustomEmailValidator,
    CustomPasswordValidator,
    PasswordMatchValidator,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzMessageModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
