import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const errors: ValidationErrors = {};

    if (!value) {
      errors['required'] = 'Este campo é obrigatório.';
      return errors;
    }

    if (value.length < 8) {
      errors['minlength'] = 'A Password deve ter pelo menos 8 caracteres.';
    }

    // Check for uppercase letter requirement
    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] =
        'A Password deve ter pelo menos uma letra maiúscula.';
    }

    // Check for lowercase letter requirement
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] =
        'A Password deve ter pelo menos uma letra minúscula.';
    }

    // Check for number requirement
    if (!/[0-9]/.test(value)) {
      errors['number'] = 'A Password deve ter pelo menos um número.';
    }

    // Check for special character requirement
    if (!/[!@#$%^&*?().,;:_-]/.test(value)) {
      errors['specialCharacter'] =
        'A Password deve ter pelo menos um caractere especial.';
    }

    // Return the errors object if there are any errors, otherwise return null
    return Object.keys(errors).length > 0 ? errors : null;
  };
}

export function passwordMatchValidator(
  passwordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.parent?.get(passwordControlName);
    return passwordControl && control.value !== passwordControl.value
      ? { passwordMismatch: true }
      : null;
  };
}
