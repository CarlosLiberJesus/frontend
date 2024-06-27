import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ICheckBoxList } from './check-box';

@Component({
  selector: 'app-bootstrap-forms-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent {
  @Input() formArray!: FormArray;
  @Input() checkboxList!: ICheckBoxList;
  @Output() checkListChanged = new EventEmitter<boolean>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the container list as string
   * @return {string}
   */
  getContainerClass(): string {
    return [...(this.checkboxList?.cssContainer ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the CSS classes for the container of a single check-box
   * @return {string}
   */
  getCheckboxClass(): string {
    return [
      ...(this.checkboxList?.css ?? []),
      'form-check',
      'form-check-check-box_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the CSS classes for the input element
   * @param {number} pos - The position of the checkbox in the list
   * @return {string} css associated to the input
   */
  getInputCheckClass(pos: number): string {
    return [
      ...(this.checkboxList?.checkbox[pos].css ?? []),
      this.shouldShowErrors() ? 'is-invalid' : '',
      'form-check-input',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getTextLabelClass(position: number): string {
    return [
      ...(this.checkboxList?.checkbox[position].cssLabel ?? []),
      'form-check-label',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Handles the change event of the checkbox.
   * @param {Event} event - The change event.
   * @param {string} value - The value of the checkbox.
   */
  onChangeCheckbox(event: Event, value: string): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.formArray.push(new FormControl(value));
    } else {
      const index = this.formArray.controls.findIndex(x => x.value === value);
      this.formArray.removeAt(index);
    }
    this.formArray.markAsDirty();
    if (this.checkboxList.autoReturn !== false) {
      this.checkListChanged.emit(true);
    }
  }

  /**
   * Checks if the checkbox is checked.
   * @param {string} value - The value of the checkbox.
   * @return {boolean} True if the checkbox is checked, false otherwise.
   */
  isChecked(value: string): boolean {
    const index = this.formArray.controls.findIndex(x => x.value === value);
    return index >= 0 ? true : false;
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(css?: string): string {
    return [...(this.checkboxList?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.checkboxList?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.checkboxList?.label?.cssExtra ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  isRequiredClass(): string {
    return this.formArray?.errors ? 'required' : '';
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.checkboxList?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.formArray?.errors || !this.checkboxList?.errors) {
      return false;
    }
    if (
      this.checkboxList.errors.config?.startsInvalid === false &&
      this.formArray.pristine
    ) {
      return false;
    }
    return this.formArray.invalid;
  }

  /**
   * Returns the error messages for the input control
   * @returns {string} Error messages
   */
  getErrorMessage(): string {
    if (!this.formArray.value.length && this.shouldShowErrors()) {
      return this.checkboxList?.errors?.messages?.required ?? '***: required';
    }
    return '';
  }
}
