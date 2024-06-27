import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IInputGroup } from './input-group';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bootstrap-forms-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent {
  @Input() inputGroup!: IInputGroup;
  @Input() formGroup!: FormGroup;
  @Output() inputGroupChanged = new EventEmitter<string>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  getInputGroupContainerClass(): string {
    return 'form-input-group_' + this.randomId;
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(css?: string): string {
    return [...(this.inputGroup?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.inputGroup?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.inputGroup?.label?.cssExtra ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  isRequiredClass(): string {
    return '';
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.inputGroup?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the FormControl associated with the given name.
   *
   * @param {string} name - The name of the FormControl to retrieve.
   * @return {FormControl} The FormControl associated with the given name.
   */
  getFormControl(name: string): FormControl {
    let control = this.formGroup.get(name) as FormControl;

    if (!control) {
      control = new FormControl('');
      this.formGroup.addControl(name, control);
    }

    return control;
  }

  onChange(name: string): void {
    if (this.inputGroup.autoReturn !== false) {
      this.inputGroupChanged.emit(name);
    }
  }
}
