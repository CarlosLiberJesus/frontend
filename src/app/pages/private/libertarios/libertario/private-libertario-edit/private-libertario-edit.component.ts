import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, catchError, EMPTY, forkJoin, takeUntil } from 'rxjs';
import { IUser } from 'src/app/lib/interfaces/user';
import { nifValidator } from 'src/app/lib/validators/nif-validator';
import { ApiService } from 'src/app/services/api.service';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { IButton } from 'src/modules/elements/html/button/button';
import { ISpinner } from 'src/modules/elements/html/spinner/spinner';

@Component({
  selector: 'app-private-libertario-edit',
  templateUrl: './private-libertario-edit.component.html',
  styleUrl: './private-libertario-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLibertarioEditComponent {
  @Input() user!: IUser;
  @Input() self!: boolean;
  @Output() cancel = new EventEmitter<boolean>();

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    nif: new FormControl('', nifValidator()),
    address: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    rgbd: new FormControl(true),
  });

  cancelButton: IButton = {
    text: '',
    css: ['btn btn-danger', 'd-flex'],
    iconLast: {
      library: 'ki-solid',
      value: 'ki-cross-square',
      css: ['fs-2', 'ms-2'],
    },
  };

  saveButton: IButton = {
    text: '',
    css: ['btn btn-success', 'd-flex'],
    iconLast: {
      library: 'ki-solid',
      value: 'ki-check-circle',
      css: ['fs-2', 'ms-2'],
    },
  };

  nameInput: IInput = {
    name: 'name',
    type: EInputType.TEXT,
    placeholder: '',
    cssInputContainer: ['mb-3'],
    cssInput: ['form-control-solid'],
  };

  nifInput: IInput = {
    name: 'nif',
    type: EInputType.TEXT,
    placeholder: '999999990',
    cssInputContainer: ['mb-3'],
    cssInput: ['form-control-solid'],
  };

  addressInput: IInput = {
    name: 'address',
    type: EInputType.TEXT,
    placeholder: '',
    cssInputContainer: ['mb-3', 'form-floating'],
    cssInput: ['form-control-solid'],
  };

  zipCodeInput: IInput = {
    name: 'zip-code',
    type: EInputType.TEXT,
    placeholder: '',
    cssInputContainer: ['mb-3', 'form-floating'],
    cssInput: ['form-control-solid'],
  };

  cityInput: IInput = {
    name: 'city',
    type: EInputType.TEXT,
    placeholder: '',
    cssInputContainer: ['mb-3', 'form-floating'],
    cssInput: ['form-control-solid'],
  };

  rgbdToggle: IToggle = {
    name: 'rgbd',
    size: ['w-45px h-30px'],
  };

  loading: ISpinner = {
    name: 'table-loading',
    cssContainer: ['my-5', 'fs-4'],
    placeholder: {
      text: '',
    },
    animation: {
      text: '...',
      css: [
        'animate__animated animate__lightSpeedInLeft animate__normal animate__infinite',
      ],
    },
  };

  roleRadio!: IRadioList;
  statusRadio!: IRadioList;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService
  ) {
    this.cancelButton = {
      ...this.cancelButton,
      text: 'Cancelar',
    };
    this.saveButton = {
      ...this.saveButton,
      text: 'Salvar',
    };
    this.nameInput = {
      ...this.nameInput,
      errors: {
        messages: {
          required: 'Nome Obrigatório',
        },
      },
    };

    this.nifInput = {
      ...this.nifInput,
      errors: {
        messages: {
          custom: 'Se fornecido, deve conter 9 digitos',
        },
      },
    };

    this.addressInput = {
      ...this.addressInput,
      placeholder: 'Morada',
    };

    this.cityInput = {
      ...this.cityInput,
      placeholder: 'Cidade',
    };

    this.zipCodeInput = {
      ...this.zipCodeInput,
      placeholder: 'Código Postal',
    };
  }

  getControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  ngOnInit(): void {
    this.formGroup.get('name')?.setValue(this.user?.fullname);
    //this.formGroup.get('role')?.setValue(this.user?.profile.role.name);
    this.formGroup.get('status')?.setValue(this.user?.profile.status.name);
    this.formGroup.get('nif')?.setValue(this.user?.details?.nif);
    this.formGroup.get('address')?.setValue(this.user?.details?.address);
    this.formGroup.get('zipCode')?.setValue(this.user?.details?.zipCode);
    this.formGroup.get('rgbd')?.setValue(this.user?.profile.rgbd);

    if (this.hasRole('admin')) {
      /*
      const rolesRequest = this.apiService
        .fetch<IUserRoles>('/users/roles/get-all')
        .pipe(
          catchError(_error => {
            return EMPTY;
          })
        );
      const statusesRequest = this.apiService
        .fetch<IUserStatuses>('/users/status/get-all')
        .pipe(
          catchError(_error => {
            return EMPTY;
          })
        );

      forkJoin([rolesRequest, statusesRequest])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([rolesResponse, statusesResponse]) => {
          if (rolesResponse.code === 200 && rolesResponse.data) {
            this.roleRadio = {
              name: 'role',
              css: [
                'gap-2',
                'form-check-inline',
                'form-check-primary',
                'form-check-solid',
              ],
              radio: rolesResponse.data.roles.map(role => {
                return {
                  text: role.name,
                  value: role.name,
                  cssLabel: ['text-' + role.color, 'fw-semibold fs-6'],
                };
              }),
            };
            this.cdr.detectChanges();
          }
          if (statusesResponse.code === 200 && statusesResponse.data) {
            this.statusRadio = {
              name: 'status',
              css: [
                'gap-2',
                'form-check-inline',
                'form-check-primary',
                'form-check-solid',
              ],
              radio: statusesResponse.data.statuses.map(status => {
                return {
                  text: status.name,
                  value: status.name,
                  cssLabel: ['text-' + status.color, 'fw-semibold fs-6'],
                };
              }),
            };
            this.cdr.detectChanges();
          }
        });

      */
    }
  }

  hasRole(userRole: string): boolean {
    return this.user.roles.some(role => role.code === userRole);
  }

  onCancel() {
    this.cancel.emit(true);
  }

  onSave() {
    this.cancel.emit(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
