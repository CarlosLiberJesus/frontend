import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { IToggle } from './toggle';

@Component({
  selector: 'app-bootstrap-forms-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  @Input() control!: FormControl;
  @Input() toggle!: IToggle;
  @Output() toggleChanged = new EventEmitter<boolean>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the container as string
   */
  getCssClass(): string {
    return [
      ...(this.toggle?.css ?? []),
      'form-check',
      'form-switch',
      'd-flex',
      'align-items-center',
      'form-toggle_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes which give sizes to the toogle
   * @return {string}
   */
  getToggleClass(): string {
    let classes: string[] = this.toggle.size ? this.toggle.size : [''];
    if (this.control?.value === true) {
      classes = classes.filter(sizeClass => sizeClass !== 'bg-white');
    }
    this.shouldShowErrors() ? classes.push('is-invalid') : classes.push('');
    return classes.filter(Boolean).join(' ');
  }

  /**
   * Returns the label of the toogle
   * @return {string}
   */
  getLabel(): string {
    let label: string = this.toggle?.text ?? '';
    if (this.toggle?.antiText && this.control?.value) {
      label = this.toggle.antiText;
    }
    return label;
  }

  /**
   * Switches the toogle
   */
  switch(): boolean {
    if (this.isDisabled()) {
      return false;
    }
    this.control.setValue(!this.control?.value);
    if (this.toggle?.autoReturn !== false) {
      this.toggleChanged.emit(this.control.value);
    }
    return true;
  }

  /**
   * Checks if the toogle is disabled
   * @returns {boolean}
   */
  isDisabled(): boolean {
    return this.toggle.css?.includes('disabled') ? true : false;
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(css?: string): string {
    return [...(this.toggle?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [...(this.toggle?.label?.css ?? []), 'align-items-center', 'd-flex']
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.toggle?.label?.cssExtra ?? [])].filter(Boolean).join(' ');
  }

  isRequiredClass(): string {
    return this.control.errors ? 'required' : '';
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.toggle?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.toggle?.errors) {
      return false;
    }
    if (
      this.toggle?.errors.config?.startsInvalid === false &&
      this.control.pristine
    ) {
      return false;
    }
    return (
      this.control.value === false &&
      this.control?.validator &&
      this.control.validator({} as AbstractControl)?.['required']
    );
  }

  /**
   * Returns the error messages for the input control
   * @returns {string} Error messages
   */
  getErrorMessage(): string {
    if (this.control && this.shouldShowErrors()) {
      if (!this.control.value && this.toggle?.errors) {
        return this.toggle?.errors?.messages?.required ?? '***: required';
      }
    }

    return '';
  }
}
