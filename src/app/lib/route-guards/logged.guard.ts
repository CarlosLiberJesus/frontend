import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.userService.getUser()) {
      return true; // Allow access if user is logged in
    } else {
      this.router.navigate(['/']); // Redirect to login page if user is not logged in
      return false;
    }
  }
}
