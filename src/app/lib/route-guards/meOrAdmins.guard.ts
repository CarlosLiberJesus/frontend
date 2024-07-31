import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class MeOrAdminsGuard implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  userUuid!: string | null;
  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (localStorage.getItem('auth')) {
      this.userUuid = route.paramMap.get('id');
      if (!this.userUuid) {
        this.alertService.setAlert({
          code: 500,
          title: 'Sem permissões',
          message:
            'Não tem permissões para acessar esta página sem detectar o UUID.',
        });
        this.router.navigate(['/inicio']);
        return new Promise<boolean>(resolve => resolve(false));
      } else {
        return new Promise<boolean>((resolve, _reject) => {
          this.userService
            .isLoadingSubject$()
            .pipe(takeUntil(this.destroy$))
            .subscribe((_isLoading: boolean) => {
              if (this.userService.getUser()) {
                this.userUuid = route.paramMap.get('id');
                if (this.userService.getUser()?.uuid === this.userUuid) {
                  resolve(true);
                } else {
                  if (
                    this.userService.hasRole('COMEL') ||
                    this.userService.hasRole('PLTOP')
                  ) {
                    resolve(true);
                  } else {
                    this.alertService.setAlert({
                      code: 500,
                      title: 'Sem permissões',
                      message:
                        'Não tem permissões para acessar esta página. Valide no seu perfil',
                    });
                    this.router.navigate(['/inicio']);
                    resolve(false);
                  }
                }
              }
            });
        })
          .then((result: boolean) => result)
          .catch((error: Error) => {
            this.alertService.setAlert({
              code: 500,
              title: 'MeOrAdminsGuard.ts error',
              message: error.message,
            });
            this.router.navigate(['/inicio']);
            return false;
          });
      }
    } else {
      this.alertService.setAlert({
        code: 500,
        title: 'Sem permissões',
        message: 'Terá de iniciar a sessão, caso queira prosseguir.',
      });
      this.router.navigate(['/']);
      return new Promise<boolean>(resolve => resolve(false));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
