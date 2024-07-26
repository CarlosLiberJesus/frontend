import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { emailValidator } from 'src/app/lib/validators/email-validator';
import { passwordValidator } from 'src/app/lib/validators/password-validator';
import { EPosition } from 'src/modules/elements/elements';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export function customPasswordMatchValidator(
  passwordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.parent?.get(passwordControlName);
    return passwordControl && control.value !== passwordControl.value
      ? { passwordMismatch: true }
      : null;
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator(),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator(),
      customPasswordMatchValidator('password'),
    ]),
    fakeFreguesia: new FormControl('', []),
    freguesia: new FormControl('', []),
  });

  username: IInput = {
    name: 'email',
    type: EInputType.TEXT,
    placeholder: 'Email',
    cssInputContainer: ['mb-3', 'form-floating'],
    icon: {
      icon: {
        library: 'bi',
        value: 'bi-info-square-fill',
        css: ['fs-3'],
      },
      position: EPosition.RIGHT,
    },
    label: {
      text: 'Email Utilizador',
      css: ['fs-5', 'fw-semibold'],
      cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
    },
  };

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
