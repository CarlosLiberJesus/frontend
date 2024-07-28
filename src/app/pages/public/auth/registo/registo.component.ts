import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { IUserValid } from 'src/app/lib/interfaces/user';
import { IFreguesias } from 'src/app/lib/interfaces/user-location';
import { emailValidator } from 'src/app/lib/validators/email-validator';
import {
  passwordMatchValidator,
  passwordValidator,
} from 'src/app/lib/validators/password-validator';
import { ApiService } from 'src/app/services/api.service';
import { PageService } from 'src/app/services/page.service';
import { UserLocationService } from 'src/app/services/user-location.service';
import { EPosition } from 'src/modules/elements/elements';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IButton } from 'src/modules/elements/html/button/button';

export function alwaysTrueValidator(): ValidatorFn {
  return (_control: AbstractControl): ValidationErrors | null => {
    const errors: ValidationErrors = {};
    errors['custom'] = 'Este email está em uso.';
    return errors;
  };
}

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrl: './registo.component.scss',
})
export class RegistoComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      passwordMatchValidator('password'),
    ]),
    fakeFreguesia: new FormControl('', []),
    freguesia: new FormControl('', [Validators.required]),
  });

  username: IInput = this.getUsername();

  password: IInput = {
    name: 'password',
    type: EInputType.PASSWORD,
    placeholder: 'Password',
    cssInputContainer: ['mb-3', 'form-floating', 'show-password'],
    cssInput: ['register'],
    autocomplete: 'new-password',
    icon: {
      icon: {
        library: 'fa-solid',
        value: 'fa-key',
        css: ['fs-4'],
        cssContainer: ['px-1'],
      },
      position: EPosition.RIGHT,
    },
    label: {
      text: 'Password',
      css: ['fs-5', 'fw-semibold'],
      cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
    },
    errors: {
      config: {
        startsInvalid: false,
      },
      messages: {
        required: 'Campo obrigatório',
        minlength: 'Pelo menos 8 caracteres',
        uppercase: 'A Password deve ter pelo menos uma letra maiúscula.',
        lowercase: 'A Password deve ter pelo menos uma letra minúscula.',
        number: 'A Password deve ter pelo menos um número.',
        specialCharacter:
          'A Password deve ter pelo menos um caractere especial. !@#$%^&*?().,;:_-',
      },
    },
  };

  passwordConfirm: IInput = {
    name: 'passwordConfirm',
    type: EInputType.PASSWORD,
    placeholder: 'Confirmar Password',
    cssInputContainer: ['mb-3', 'form-floating', 'show-password'],
    cssInput: ['register'],
    icon: {
      icon: {
        library: 'fa-solid',
        value: 'fa-key',
        css: ['fs-4'],
        cssContainer: ['px-1'],
      },
      position: EPosition.RIGHT,
    },
    label: {
      text: 'Confirmar Password',
      css: ['fs-5', 'fw-semibold'],
      cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
    },
    errors: {
      config: {
        startsInvalid: true,
        showValid: true,
      },
      messages: {
        required: 'Campo obrigatório',
        passwordMismatch: 'As Passwords devem ser iguais',
      },
    },
  };

  name: IInput = {
    name: 'name',
    type: EInputType.TEXT,
    placeholder: 'Nome',
    cssInputContainer: ['mb-3', 'form-floating'],
    label: {
      text: 'Nome',
      css: ['fs-5', 'fw-semibold'],
      cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
    },
  };

  fakeFreguesia: IInput = {
    name: 'fakeFreguesia',
    type: EInputType.TEXT,
    placeholder: 'Freguesias',
    cssInputContainer: ['mb-3', 'form-floating'],
    cssInput: ['disabled'],
    icon: {
      icon: {
        library: 'bi',
        value: 'bi-arrow-clockwise',
        css: ['fs-2'],
        cssContainer: [
          'animate__animated animate__rotateOut animate__infinite animate__no-fade',
        ],
      },
      position: EPosition.RIGHT,
    },
    label: {
      text: 'Freguesia',
      css: ['fs-5', 'fw-semibold'],
      cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
    },
  };

  freguesiaSelect: ISelect = {
    name: 'freguesia',
    placeholder: 'Freguesia de residência',
    css: ['min-w-200px', 'search', 'message', 'floating'],
    cssOption: ['text-dark'],
    cssPane: ['activate-scroll'],
    option: [],
    label: {
      text: 'Freguesia',
      css: ['fs-5', 'fw-semibold'],
      cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
    },
    message: {
      text: 'Atenção! Para alterar depois, terá de pedir uma nova autorização.',
      css: ['fs-5', 'fw-bold', 'text-ancap'],
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
    search: {
      input: {
        name: 'search',
        cssInput: ['h-25px'],
        placeholder: 'Pesquisar...',
        type: EInputType.TEXT,
        icon: {
          icon: {
            library: 'bi',
            value: 'bi-search',
            css: ['fs-6', 'me-2'],
            cssContainer: ['pb-0 mt-4'],
          },
          position: EPosition.RIGHT,
        },
      },
      control: this.getControl('fakeFreguesia'),
    },
  };

  freguesias!: IFreguesias;
  submitButton!: IButton;
  processing = false;

  constructor(
    private pageService: PageService,
    private apiService: ApiService,
    private userLocationService: UserLocationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const breadcrumb: IAppBreadcrumb = {
      title: 'Registo Novo Libertário',
      items: [
        {
          label: 'Inicio',
          link: '/',
        },
        {
          label: 'Novo Libertário',
        },
      ],
    };

    this.pageService.setBreadcrumb(breadcrumb);

    let previousEmail = '';
    this.formGroup
      .get('email')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(email => {
        if (email !== previousEmail) {
          const emailControl = this.getControl(
            'email'
          ) as unknown as AbstractControl;
          if (emailControl.getError('custom')) {
            const emailControl = this.formGroup.get('email');
            const validators = [Validators.required, emailValidator()];
            emailControl?.setValidators(validators);
            emailControl?.updateValueAndValidity();
            this.cdr.detectChanges();
          }
        }

        if (email !== previousEmail && this.formGroup.get('email')?.valid) {
          previousEmail = email;
          this.checkEmailAvailability(email);
        }
      });

    this.userLocationService
      .loadFullFreguesias()
      .pipe(takeUntil(this.destroy$))
      .subscribe(freguesiasReply => {
        if (
          typeof freguesiasReply === 'object' &&
          Array.isArray(freguesiasReply.freguesias)
        ) {
          this.freguesiaSelect = {
            ...this.freguesiaSelect,
            option: freguesiasReply.freguesias.map(freguesia => ({
              text: freguesia.name,
              value: freguesia.uuid,
            })),
          };
          this.freguesias = freguesiasReply;
        }
      });
  }

  private checkEmailAvailability(email: string): void {
    this.apiService
      .get<IUserValid>('/users/check-mail', { email: email })
      .pipe(
        takeUntil(this.destroy$),
        map(response => {
          if (response.code === 200 && response.data) {
            if (response.data.valid) {
              this.username = {
                ...this.username,
                errors: {
                  config: {
                    startsInvalid: true,
                    showValid: true,
                  },
                  messages: {
                    ...this.username.errors?.messages,
                  },
                },
              };
              this.cdr.detectChanges();
            } else {
              const emailControl = this.formGroup.get('email');
              const validators = [alwaysTrueValidator()];
              emailControl?.setValidators(validators);
              emailControl?.updateValueAndValidity();
              this.username = {
                ...this.username,
                errors: {
                  config: {
                    startsInvalid: true,
                    showValid: true,
                  },
                  messages: {
                    ...this.username.errors?.messages,
                    custom: 'Este email está em uso',
                  },
                },
              };
              this.cdr.detectChanges();
            }
          } else {
            this.pageService.setAlert({
              code: 500,
              title: response.message ?? 'Erro de Servidor',
              message:
                response.message ?? 'Validar de onde vem mensagem de erro',
              exception: response.exception,
            });
          }
        })
      )
      .subscribe();
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  getSubmitButton(): IButton {
    const isPristine = this.formGroup.pristine;
    const hasNoErrors = this.formGroup.valid;
    if (isPristine || !hasNoErrors) {
      this.submitButton = {
        text: 'Registar',
        css: [
          'border-danger border-1 border border-dashed rounded-1',
          'mt-5',
          'btn-active-light-danger',
          'w-100',
        ],
      };
    } else {
      this.submitButton = {
        text: 'Registar',
        css: ['btn', 'btn-bg-ancap', 'btn-text-capan', 'w-100', 'mt-5'],
        spinner: this.processing
          ? {
              name: 'auth-loading',
              style: {
                css: ['ms-2', 'text-capan', 'spinner-border', 'h-20px w-20px'],
              },
            }
          : undefined,
      };
    }
    return this.submitButton;
  }

  submit(_event: boolean): void {
    console.log('click');
    if (this.formGroup.valid && !this.processing) {
      this.processing = true;
      this.apiService
        .get<IUserValid>('/users/registar', {
          email: this.getControl('email').value,
          name: this.getControl('name').value,
          password: this.getControl('password').value,
          freguesia: this.getControl('freguesia').value,
        })
        .pipe(
          takeUntil(this.destroy$),
          map(response => {
            console.log(response);
            if (response.code === 200 && response.data) {
              if (response.data.valid) {
                console.log('criou');
              } else {
                console.log('error');
                this.pageService.setAlert({
                  code: 500,
                  title: response.message ?? 'Erro de Servidor',
                  message:
                    response.message ?? 'Validar de onde vem mensagem de erro',
                  exception: response.exception,
                });
              }
            }
          })
        )
        .subscribe();
    }
  }

  private getUsername(): IInput {
    return {
      name: 'email',
      type: EInputType.TEXT,
      placeholder: 'Email',
      autocomplete: 'username',
      cssInputContainer: ['mb-3', 'form-floating', 'position-relative'],
      icon: {
        icon: {
          library: 'fa-solid',
          value: 'fa-user-lock',
          css: ['fs-4'],
          cssContainer: ['pe-2'],
        },
        position: EPosition.RIGHT,
      },
      label: {
        text: 'Email Utilizador',
        css: ['fs-5', 'fw-semibold'],
        cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
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
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
