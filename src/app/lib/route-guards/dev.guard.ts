import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!environment.local) {
      // If the environment is not 'development', redirect to a different route
      this.router.navigate(['']);
      return false;
    }
    return true; // Allow access in development environment
  }
}
