import { ValidatorFn, AbstractControl } from '@angular/forms';

export function nifValidator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value == null || control.value === '') {
      return null; // Return null if the control value is empty
    }
    const nifPattern = /^[0-9]{9}$/;
    const isValid = nifPattern.test(control.value);
    return isValid ? null : { custom: { value: control.value } };
  };
}
