import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthWrapperComponent } from '../extensions/auth-wrapper.component';
import { LoginComponent } from '../login/login.component';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { TeacherSubjectsComponent } from '../teacher-subjects/teacher-subjects.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Register',
    component: AuthWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
