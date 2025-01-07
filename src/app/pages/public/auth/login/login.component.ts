import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, catchError, EMPTY } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { emailValidator } from 'src/app/lib/validators/email-validator';
import { AlertService } from 'src/app/services/alert.service';
import { PageService } from 'src/app/services/page.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { UserService } from 'src/app/services/user.service';
import { EPosition } from 'src/modules/elements/elements';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IButton } from 'src/modules/elements/html/button/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    autocomplete: 'username',
    placeholder: 'E-mail',
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

  submitButton!: IButton;
  processing = false;

  constructor(
    private pageService: PageService,
    private router: Router,
    private alertService: AlertService,
    private splashScreenService: SplashScreenService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const breadcrumb: IAppBreadcrumb = {
      title: 'Iniciar Sessão',
      items: [
        {
          label: 'Inicio',
          link: '/',
        },
        {
          label: 'Entrar',
        },
      ],
    };

    this.pageService.setBreadcrumb(breadcrumb);
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
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
              cssContainer: ['fw-bolder', 'fs-2'],
              animation: {
                text: '...',
                css: [
                  'animate__animated animate__lightSpeedInLeft animate__faster animate__infinite fw-bolder',
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
            this.formGroup.reset();
            return EMPTY;
          })
        )
        .subscribe({
          next: response => {
            if (response === '') {
              setTimeout(() => {
                this.userService
                  .isLoadingSubject$()
                  .pipe(
                    takeUntil(this.destroy$),
                    catchError(_error => {
                      this.processing = false;
                      this.submitButton = {
                        ...this.submitButton,
                        spinner: undefined,
                      };
                      return EMPTY;
                    })
                  )
                  .subscribe((_isLoading: boolean) => {
                    if (this.userService.getUser()) {
                      this.alertService.setAlert({
                        code: 200,
                        title: 'Bem vindo',
                        message: 'Login efetuado com sucesso',
                      });
                      this.router.navigate(['/inicio']);
                    }
                  });
                this.splashScreenService.show();
              }, 500);
            } else {
              this.processing = false;
              /*this.alertService.setAlert({
                code: 500,
                title: 'Erro de Servidor',
                message: response,
              });*/
            }
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
