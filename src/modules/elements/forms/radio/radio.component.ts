import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IRadioList } from './radio';

@Component({
  selector: 'app-bootstrap-forms-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
  @Input() control!: FormControl;
  @Input() radioList!: IRadioList;
  @Output() radioChanged = new EventEmitter<boolean>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the container list as string
   * @return {string}
   */
  getContainerClass(): string {
    return [
      ...(this.radioList?.cssContainer ?? []),
      'form-check-radio_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the container as string
   * @returns {string}
   */
  getFormCheckClass(): string {
    return [...(this.radioList?.css ?? []), 'form-check']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the input element
   * @param {number} pos - The position of the checkbox in the list
   * @returns {string} css associated to the input
   */
  getInputCheckClass(pos: number): string {
    return [
      ...(this.radioList?.radio[pos].css ?? []),
      this.shouldShowErrors() ? 'is-invalid' : '',
      'form-check-input',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getTextLabelClass(position: number): string {
    return [
      ...(this.radioList?.radio[position].cssLabel ?? []),
      'form-check-label',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns true if the checkbox is selected
   * @param {number} pos - The position of the checkbox in the list
   * @returns {boolean} True if the checkbox is selected, false otherwise
   */
  isSelected(pos: number): boolean {
    if (this.radioList?.radio[pos].value === this.control.value) {
      return true;
    }
    return false;
  }

  /**
   * Handles the change event of the checkbox
   * @param {MouseEvent | KeyboardEvent} _$event - The change event
   * @param {number} pos - The position of the checkbox in the list
   */
  radioClicked(_$event: MouseEvent | KeyboardEvent, pos: number): void {
    this.control.setValue(this.radioList?.radio[pos].value);
    this.control.markAsDirty();
    if (this.radioList?.autoReturn !== false) {
      this.radioChanged.emit(true);
    }
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(css?: string): string {
    return [...(this.radioList?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.radioList?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.radioList?.label?.cssExtra ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  isRequiredClass(): string {
    return this.control.errors ? 'required' : '';
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.radioList?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.control?.errors || !this.radioList?.errors) {
      return false;
    }
    if (
      this.radioList.errors.config?.startsInvalid === false &&
      this.control.pristine
    ) {
      return false;
    }
    return this.control.invalid;
  }

  /**
   * Returns the error messages for the input control
   * @returns {string} Error messages
   */
  getErrorMessage(): string {
    if (!this.control.value && this.shouldShowErrors()) {
      return this.radioList?.errors?.messages?.required ?? '***: required';
    }
    return '';
  }
}
