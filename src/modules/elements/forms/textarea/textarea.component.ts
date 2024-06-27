import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITextarea } from './textarea';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-bootstrap-forms-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements AfterViewInit {
  @Input() control!: FormControl;
  @Input() textarea!: ITextarea;
  @Output() inputChanged = new EventEmitter<string>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * ngAfterViewInit is called after the component's view has been initialized.
   * Inicializes a listener for the value changes of the control
   */
  ngAfterViewInit(): void {
    if (this.textarea?.autoReturn !== false) {
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
  getTextareaContainerClass(): string {
    return [
      ...(this.textarea?.cssTextareaContainer ?? []),
      'form-textarea_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getTextareaLabelClass(css?: string): string {
    return [...(this.textarea?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.textarea?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.textarea?.label?.cssExtra ?? [])]
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
  getTextareaMsgClass(): string {
    return [...(this.textarea?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the Textarea
   * @returns {string}
   */
  getTextareaClass(): string {
    return [
      ...(this.textarea?.cssTextarea ?? []),
      'form-control',
      this.shouldShowErrors() ? 'is-invalid' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input is disabled. If so, the control is disabled
   * @returns {boolean|null}
   */
  isDisabled(): boolean | null {
    const disabled = this.textarea?.cssTextarea?.includes('disabled')
      ? true
      : null;
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
    if (!this.control.errors || !this.textarea?.errors) {
      return false;
    }
    if (
      this.textarea.errors.config?.startsInvalid === false &&
      this.control.pristine
    ) {
      return false;
    }
    return this.control.invalid;
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
          (this.textarea.errors?.messages as { [key: string]: string })?.[
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
}
