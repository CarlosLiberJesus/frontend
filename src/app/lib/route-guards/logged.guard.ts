import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  canActivate(): Promise<boolean> {
    if (!localStorage.getItem('auth')) {
      this.alertService.setAlert({
        code: 500,
        title: 'Sem permissões',
        message: 'Terá de iniciar a sessão, caso queira prosseguir.',
      });
      this.router.navigate(['/']);
      return new Promise<boolean>(resolve => resolve(false));
    } else if (!this.userService.getUser()) {
      //this.splashScreenService.show();
      return new Promise<boolean>((resolve, _reject) => {
        this.userService
          .isLoadingSubject$()
          .pipe(takeUntil(this.destroy$))
          .subscribe((_isLoading: boolean) => {
            if (this.userService.getUser()) {
              resolve(true);
            }
          });
      })
        .then((result: boolean) => result)
        .catch((error: Error) => {
          this.alertService.setAlert({
            code: 500,
            title: 'LoggedInGuard.ts error',
            message: error.message,
          });
          this.router.navigate(['/']);
          return false;
        });
    } else {
      return new Promise<boolean>(resolve => resolve(true));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
