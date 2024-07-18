import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { UserService } from 'src/app/services/user.service';
import { takeUntil, Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements AfterViewInit, OnDestroy {
  @ViewChild('splashScreen', { static: false }) splashScreen: ElementRef;

  isAnimationComplete = true;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private animationBuilder: AnimationBuilder,
    private splashScreenService: SplashScreenService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.splashScreenService
      .isVisible$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isVisible => {
        if (isVisible) {
          this.show();
          const auth = JSON.parse(localStorage.getItem('auth') ?? '{}');
          if (auth.accessToken) {
            this.isAnimationComplete = false;
            this.userService
              .getUserByToken()
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: response => {
                  if (response) {
                    localStorage.removeItem('auth');
                    this.alertService.setAlert({
                      code: 500,
                      title: 'Erro do Servidor',
                      message: 'Erro na validação do Token:: ' + response,
                    });

                    this.router.navigate(['/']);
                  }
                  this.isAnimationComplete = false;
                  this.hide();
                },
              });
          }
        } else {
          const auth = JSON.parse(localStorage.getItem('auth') ?? '{}');
          if (auth.accessToken) {
            this.isAnimationComplete = false;
            this.userService
              .getUserByToken()
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: response => {
                  if (response) {
                    localStorage.removeItem('auth');
                    this.alertService.setAlert({
                      code: 500,
                      title: 'Erro do Servidor',
                      message: 'Erro na validação do Token:: ' + response,
                    });
                    this.router.navigate(['/']);
                  }
                  this.isAnimationComplete = false;
                  this.hide();
                },
              });
          } else {
            this.hide();
          }
        }
      });
  }

  hide() {
    if (!this.isAnimationComplete && !this.splashScreen) {
      return;
    }

    this.isAnimationComplete = false;
    const player = this.animationBuilder
      .build([style({ opacity: '1' }), animate(800, style({ opacity: '0' }))])
      .create(this.splashScreen.nativeElement);

    player.onDone(() => {
      this.splashScreen.nativeElement.style.display = 'none';
      this.isAnimationComplete = true;
    });

    setTimeout(() => player.play(), 100);
  }

  /**
   * Show
   */
  show() {
    if (!this.isAnimationComplete && !this.splashScreen) {
      return;
    }
    this.isAnimationComplete = false;

    const player = this.animationBuilder
      .build([
        style({ opacity: '0', display: 'inline-flex' }),
        animate(800, style({ opacity: '1' })),
      ])
      .create(this.splashScreen.nativeElement);

    player.onDone(() => {
      this.isAnimationComplete = true;
    });

    setTimeout(() => player.play(), 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
