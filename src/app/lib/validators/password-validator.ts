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
      errors['minLength'] = 'A Password deve ter pelo menos 8 caracteres.';
    }

    // Check for uppercase letter requirement
    if (!/[A-Z]/.test(value)) {
      errors['uppercaseRequired'] =
        'A Password deve ter pelo menos uma letra maiúscula.';
    }

    // Check for lowercase letter requirement
    if (!/[a-z]/.test(value)) {
      errors['lowercaseRequired'] =
        'A Password deve ter pelo menos uma letra minúscula.';
    }

    // Check for number requirement
    if (!/[0-9]/.test(value)) {
      errors['numberRequired'] = 'A Password deve ter pelo menos um número.';
    }

    // Check for special character requirement
    if (!/[!@#$%^&*]/.test(value)) {
      errors['specialCharacterRequired'] =
        'A Password deve ter pelo menos um caractere especial.';
    }

    // Return the errors object if there are any errors, otherwise return null
    return Object.keys(errors).length > 0 ? errors : null;
  };
}
