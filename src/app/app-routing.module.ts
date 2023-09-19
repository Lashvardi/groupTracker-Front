import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdditionalCompaniesStepComponent } from './components/auth/additional-companies-step/additional-companies-step.component';
import { AuthWrapperComponent } from './components/auth/auth-wrapper.component';

const routes: Routes = [
  {
    path: 'auth/Login',
    component: LoginComponent,
  },
  {
    path: 'auth/Register',
    component: AuthWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
