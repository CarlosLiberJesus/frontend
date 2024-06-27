import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IButtonGroup, IButtonGroupElement } from './button-group';
import { FormArray, FormControl } from '@angular/forms';
import { EInputType } from '../input/input';

@Component({
  selector: 'app-bootstrap-forms-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent {
  @Input() formArray!: FormArray;
  @Input() buttonGroup!: IButtonGroup;
  @Output() buttonGroupChanged = new EventEmitter<boolean>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(): string {
    return ['mb-2', 'form-label'].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.buttonGroup?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.buttonGroup?.label?.cssExtra ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  isRequiredClass(): string {
    return this.formArray?.errors ? 'required' : '';
  }

  getContainerClass(): string {
    return ['btn-group', ...(this.buttonGroup?.cssContainer ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  getButtonClass(i: number, j: number): string {
    let index = i;
    if (this.buttonGroup.perRow !== undefined) {
      index = i + j * this.buttonGroup.perRow;
    }

    const classes = [
      ...(this.buttonGroup.element[index].button.css ?? []),
      'btn',
    ];
    if (this.isChecked(this.buttonGroup.element[index].value)) {
      classes.push(
        ...(this.buttonGroup.active.css ?? []),
        'bg-' + this.buttonGroup.active.color
      );
    } else {
      classes.push('btn-active-light-' + this.buttonGroup.active.color);
    }
    return classes.filter(Boolean).join(' ');
  }

  getColorClass(position: number): string {
    return [...(this.buttonGroup.element[position].button.color?.css ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.buttonGroup?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.formArray?.errors || !this.buttonGroup?.errors) {
      return false;
    }
    if (
      this.buttonGroup.errors.config?.startsInvalid === false &&
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
      return this.buttonGroup?.errors?.messages?.required ?? '***: required';
    }
    return '';
  }

  isChecked(value: string): boolean {
    const index = this.formArray.controls.findIndex(x => x.value === value);
    return index >= 0 ? true : false;
  }

  /**
   * Handles the change event of the checkbox.
   * @param {Event} event - The change event.
   * @param {string} value - The value of the checkbox.
   */
  onChange(event: Event, value: string): void {
    if (this.buttonGroup.type === EInputType.CHECKBOX) {
      this.setCheckBoxValue(event, value);
    } else {
      this.setRadioValue(value);
    }
  }

  setRadioValue(value: string): void {
    if (!this.buttonGroup.cssContainer?.includes('unselect')) {
      this.formArray.clear();
      this.formArray.push(new FormControl(value));
    } else {
      const index = this.formArray.controls.findIndex(x => x.value === value);
      if (index < 0) {
        this.formArray.clear();
        this.formArray.push(new FormControl(value));
      } else {
        this.formArray.removeAt(index);
      }
    }
    this.formArray.markAsDirty();
    if (this.buttonGroup.autoReturn !== false) {
      this.buttonGroupChanged.emit(true);
    }
  }

  setCheckBoxValue(event: Event, value: string): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.formArray.push(new FormControl(value));
    } else {
      const index = this.formArray.controls.findIndex(x => x.value === value);
      this.formArray.removeAt(index);
    }
    this.formArray.markAsDirty();
    if (this.buttonGroup.autoReturn !== false) {
      this.buttonGroupChanged.emit(true);
    }
  }

  getNumberRows(): string[] {
    if (!this.buttonGroup) {
      return [];
    }
    let rows = 1;
    if (this.buttonGroup.element.length && this.buttonGroup.perRow) {
      rows = Math.ceil(
        this.buttonGroup.element.length / this.buttonGroup.perRow
      );
    }
    return Array(rows).fill(' ');
  }

  getElements(row: number): IButtonGroupElement[] {
    if (!this.buttonGroup.perRow) {
      return this.buttonGroup.element;
    }
    const startIndex = this.buttonGroup.perRow * row;
    const endIndex = this.buttonGroup.perRow * (row + 1);

    return this.buttonGroup.element.slice(startIndex, endIndex);
  }
}
