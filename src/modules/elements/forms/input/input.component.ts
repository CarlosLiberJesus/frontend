import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { EInputType, IInput } from './input';
import { EPosition } from '../../elements';

@Component({
  selector: 'app-bootstrap-forms-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements AfterViewInit {
  @Input() control!: FormControl;
  @Input() input!: IInput;
  @Output() inputChanged = new EventEmitter<string>();
  @Output() submitForm = new EventEmitter<boolean>();

  toggleShowPassword = false;
  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * ngAfterViewInit is called after the component's view has been initialized.
   * Inicializes a listener for the value changes of the control
   */
  ngAfterViewInit(): void {
    if (this.input?.autoReturn !== false) {
      this.control?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        if (this.control.dirty && !this.control.pristine) {
          this.inputChanged.emit(this.control.value);
        }
      });
    }
  }

  /**
   * Returns the css classes for the container
   * @returns {string}
   */
  getInputContainerClass(): string {
    return [...(this.input?.cssInputContainer ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getInputLabelClass(css?: string): string {
    return [...(this.input?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [...(this.input?.label?.css ?? []), 'align-items-center', 'd-flex']
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.input?.label?.cssExtra ?? [])].filter(Boolean).join(' ');
  }

  isRequiredClass(): string {
    return this.control.errors ? 'required' : '';
  }

  showInputIcon(): boolean {
    return true;
  }

  /**
   * Returns the css classes for the input
   * @returns {string}
   */
  getInputMsgClass(): string {
    return [...(this.input?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the input
   * @returns {string}
   */
  getInputClass(): string {
    return [
      ...(this.input?.cssInput ?? []),
      'form-input_' + this.randomId,
      'form-control',
      this.shouldShowErrors()
        ? 'is-invalid'
        : this.input.errors?.config?.showValid === true
          ? 'is-valid'
          : '',
      this.input.icon?.position === EPosition.LEFT ? 'ps-11' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getIconClass(): string {
    if (this.input?.icon?.position === EPosition.RIGHT) {
      return (
        'position-absolute end-0 translate-middle' +
        (this.input.cssInputContainer?.includes('form-floating')
          ? ' pb-15'
          : ' pb-12') +
        (this.shouldShowErrors() ? ' me-7' : '')
      );
    } else {
      return 'position-absolute pb-12 translate-middle ms-6';
    }
  }

  getPaddingPlaceholder(): string {
    return this.input.icon?.position === EPosition.LEFT ? 'ps-12' : '';
  }

  /**
   * Checks if the input is disabled. If so, the control is disabled
   * @returns {boolean|null}
   */
  isDisabled(): boolean | null {
    const disabled = this.input?.cssInput?.includes('disabled') ? true : null;
    if (disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    return disabled;
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.control?.errors || !this.input?.errors) {
      return false;
    }
    if (
      this.input.errors.config?.startsInvalid === true &&
      this.control.pristine
    ) {
      return true;
    }
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  /**
   * Returns the error messages for the input control
   * @returns {string} Error message
   */
  getErrorMessage(): string {
    const errors = this.control?.errors;

    if (errors) {
      for (const validatorName of Object.keys(errors)) {
        const errorMessage =
          (this.input?.errors?.messages as { [key: string]: string })?.[
            validatorName
          ] || '';
        if (errorMessage) {
          return errorMessage;
        } else {
          return '***: ' + validatorName;
        }
      }
    }
    return '';
  }

  togglePassword(): void {
    if (this.input.cssInputContainer?.includes('show-password')) {
      if (
        this.input?.type === EInputType.PASSWORD &&
        !this.toggleShowPassword
      ) {
        this.toggleShowPassword = true;
        this.input.type = EInputType.TEXT;
        const antiValue: string = this.input.icon?.icon.antiValue ?? '';
        if (this.input.icon) {
          this.input.icon.icon.antiValue = this.input.icon.icon.value;
          this.input.icon.icon.value = antiValue;
        }
      } else if (
        this.input?.type === EInputType.TEXT &&
        this.toggleShowPassword
      ) {
        this.input.type = EInputType.PASSWORD;
        this.toggleShowPassword = false;
        const antiValue: string = this.input.icon?.icon.antiValue ?? '';
        if (this.input.icon) {
          this.input.icon.icon.antiValue = this.input.icon.icon.value;
          this.input.icon.icon.value = antiValue;
        }
      }
    }
  }

  onPasswordKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submitForm.emit(true);
    }
  }
}
