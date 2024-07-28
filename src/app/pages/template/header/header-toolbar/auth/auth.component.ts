import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, catchError, EMPTY, Subject } from 'rxjs';
import { emailValidator } from 'src/app/lib/validators/email-validator';
import { AlertService } from 'src/app/services/alert.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { AuthUser, UserService } from 'src/app/services/user.service';
import { IAvatar } from 'src/modules/elements/base/avatar/avatar';
import { IIcon } from 'src/modules/elements/base/icon/icon';
import { EPosition } from 'src/modules/elements/elements';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IButton } from 'src/modules/elements/html/button/button';
import { ISeparator } from 'src/modules/elements/html/separator/separator';

@Component({
  selector: 'app-layout-header-toolbar-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  user: AuthUser | undefined;

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  emailInput: IInput = {
    name: 'emailInput',
    type: EInputType.EMAIL,
    placeholder: 'E-mail',
    autocomplete: 'username',
    cssInputContainer: ['position-relative', 'form-floating'],
    label: {
      text: 'Utilizador',
      css: ['fs-5', 'fw-semibold'],
    },
    icon: {
      icon: {
        library: 'bi',
        value: 'bi-envelope',
        css: ['fs-2', 'text-gray-500'],
      },
      position: EPosition.LEFT,
    },
    errors: {
      config: {
        startsInvalid: false,
      },
      messages: {
        required: 'Campo obrigatório',
        email: 'Indique um email válido',
      },
    },
  };

  passwordInput: IInput = {
    name: 'passwordInput',
    type: EInputType.PASSWORD,
    placeholder: 'Palavra-Chave',
    autocomplete: 'current-password',
    cssInputContainer: ['mt-6', 'mb-3', 'position-relative', 'show-password'],
    label: {
      text: 'Palavra-Chave',
      css: ['fs-5', 'fw-semibold'],
    },
    errors: {
      config: {
        startsInvalid: false,
      },
      messages: {
        required: 'Campo obrigatório',
        minlength: 'A palavra-chave tem pelo menos 6 caracteres',
      },
    },
  };

  separator: ISeparator = {
    css: ['border-5', 'border-gray-900', 'separator-content', 'mb-7'],
    label: 'Idenficação',
    labelCss: [
      'fw-bold',
      'text-nowrap',
      'text-gray-900',
      'fs-7',
      'text-uppercase',
    ],
  };

  logOutIcon: IIcon = {
    library: 'bi',
    value: 'bi-arrow-bar-left',
    css: ['fs-3'],
  };

  avatar!: IAvatar;
  authIcon!: IButton;
  submitButton!: IButton;

  showMenu = false;
  processing = false;

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertService: AlertService,
    private splashScreenService: SplashScreenService,
    private userService: UserService
  ) {
    //this.setOfflineContent();
  }

  ngOnInit(): void {
    this.userService
      .isLoadingSubject$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading: boolean) => {
        this.user = this.userService.getUser();
        if (!isLoading && this.user === undefined) {
          this.setOfflineContent();
        } else if (isLoading && this.user === undefined) {
          this.setLoadingContent();
        } else if (!isLoading && this.user) {
          this.setOnlineContent();
        }
        this.cdr.detectChanges();
      });
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  setLoadingContent(): void {
    this.authIcon = {
      css: ['btn-icon', 'btn-custom', 'btn-icon-gray-900'],
      spinner: {
        style: {
          css: ['me-1', 'text-gray-900', 'spinner-border', 'h-20px w-20px'],
        },
      },
    };
  }

  setOnlineContent(): void {
    this.avatar = {
      img: !this.user?.profile?.avatar
        ? 'assets/bootstrap-lib/media/avatars/blank.png'
        : undefined,
      base64: this.user?.profile?.avatar ?? undefined,
      css: ['symbol-35px', 'cursor-pointer', 'mb-3'],
    };
    this.cdr.detectChanges();
  }

  setOfflineContent(): void {
    this.authIcon = {
      css: [
        'mb-1',
        'btn-icon',
        'btn-custom',
        'btn-icon-gray-900',
        'btn-active-dark',
        'btn-active-color-ancap',
        'w-35px',
        'h-35px',
        'w-md-40px',
        'h-md-40px',
      ],
      iconFirst: {
        library: 'fa-solid',
        value: 'fa-user-lock',
        css: ['fs-2'],
      },
    };
  }

  getPanelClass(): string {
    return [
      'position-absolute',
      'top-100',
      'end-0',
      'card',
      'card-dashed',
      'cursor-default',
      'z-index-3',
      this.userService.getUser() ? '' : 'w-350px',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getSubmitButton(): IButton {
    const isPristine = this.formGroup.pristine;
    const hasNoErrors = this.formGroup.valid;
    if (isPristine || !hasNoErrors) {
      this.submitButton = {
        text: 'Entrar',
        css: [
          'border-danger border-1 border border-dashed rounded-1',
          'mt-5',
          'btn-active-light-danger',
          'w-100',
        ],
      };
    } else {
      this.submitButton = {
        text: 'Entrar',
        css: ['btn', 'btn-ancap', 'w-100', 'mt-5'],
        spinner: this.processing
          ? {
              name: 'auth-loading',
              animation: {
                text: '...',
                css: [
                  'animate__animated animate__lightSpeedInLeft animate__faster animate__infinite',
                ],
              },
            }
          : undefined,
      };
    }
    return this.submitButton;
  }

  submit(_event: boolean): void {
    if (!this.formGroup.valid && !this.processing) {
      if (!this.formGroup.valid) {
        const emailControl = this.formGroup.get('email');
        if (emailControl?.errors) {
          this.emailInput = {
            ...this.emailInput,
            errors: {
              config: {
                startsInvalid: true,
              },
              messages: {
                required: 'Campo obrigatório',
                email: 'Indique um email válido',
              },
            },
          };
        }
        const passwordControl = this.formGroup.get('password');
        if (passwordControl?.errors) {
          this.passwordInput = {
            ...this.passwordInput,
            errors: {
              config: {
                startsInvalid: true,
              },
              messages: {
                required: 'Campo obrigatório',
                minlength: 'A palavra-chave tem pelo menos 6 caracteres',
              },
            },
          };
        }
      }
      return;
    }
    this.processing = true;
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;
    if (email && password) {
      this.userService
        .login(email, password)
        .pipe(
          takeUntil(this.destroy$),
          catchError(_error => {
            this.alertService.setAlert({
              code: 500,
              title: 'Erro de Servidor',
              message: 'Confirme se tem acesso ao servidor',
            });
            this.processing = false;
            this.showMenu = false;
            this.formGroup.reset();
            this.cdr.detectChanges();
            this.router.navigate(['/libertario/entrar']);
            return EMPTY;
          })
        )
        .subscribe({
          next: response => {
            this.showMenu = false;
            this.processing = false;
            this.formGroup.reset();
            this.cdr.detectChanges();
            if (response === '') {
              setTimeout(() => {
                this.userService
                  .isLoadingSubject$()
                  .pipe(takeUntil(this.destroy$))
                  .subscribe((_isLoading: boolean) => {
                    if (this.userService.getUser()) {
                      this.alertService.setAlert({
                        code: 200,
                        title: 'Bem vindo',
                        message: 'Login efetuado com sucesso',
                      });
                      //TODO ver a route onde estou, o forcing para o inicio apenas na home ;)
                      this.router.navigate(['/inicio']);
                    }
                  });
                this.splashScreenService.show();
              }, 500);
            } else {
              this.alertService.setAlert({
                code: 500,
                title: 'Erro de Servidor',
                message: response,
              });
              this.router.navigate(['/libertario/entrar']);
            }
          },
        });
    }
  }

  changeAuthMenu(_event: MouseEvent | KeyboardEvent, action: string): void {
    this.showMenu = false;
    switch (action) {
      case 'logout':
        this.userService.logOut();
        this.cdr.detectChanges();
        break;
      case 'profile':
        this.router.navigate(['/libertarios', this.user?.uuid]);
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
