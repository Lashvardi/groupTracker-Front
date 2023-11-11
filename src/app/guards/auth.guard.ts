import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../modules/auth/extensions/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: NzMessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isTokenSet()) {
      // Token is set, allow access
      return true;
    } else {
      // No token set, redirect to login page with a warning message
      this.messageService.warning(
        'You need to be logged in to access this page.'
      );
      this.router.navigate(['/auth/Login'], {
        // post Login Redirection
        queryParams: { redirectUrl: state.url },
      });
      return false;
    }
  }
}
