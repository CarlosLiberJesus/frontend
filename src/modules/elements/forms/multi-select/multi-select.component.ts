import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { IIcon } from '../../base/icon/icon';
import { IMultiSelect, IMultiSelectOption } from './multi-select';

@Component({
  selector: 'app-bootstrap-forms-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent {
  @Input() formArray!: FormArray;
  @Input() multiSelect!: IMultiSelect;
  @Output() multiSelectChanged = new EventEmitter<boolean>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  defaultIcon: IIcon = {
    library: 'fa-solid',
    value: 'fa-angle-down',
    css: ['fs-2', 'rotate-180', 'ms-2'],
    cssContainer: ['rotate d-flex'],
  };

  opened = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.opened = false;
      if (!this.multiSelect.iconToggle) {
        this.defaultIcon = {
          ...this.defaultIcon,
          cssContainer: (this.defaultIcon?.cssContainer || []).filter(
            item => item !== 'active'
          ),
        };
      } else {
        this.multiSelect = {
          ...this.multiSelect,
          iconToggle: {
            ...this.multiSelect.iconToggle,
            cssContainer: (
              this.multiSelect.iconToggle?.cssContainer || []
            ).filter(item => item !== 'active'),
          },
        };
      }
    }
  }

  /**
   * Toggles the select - shows dropdown or hides
   */
  toogle(): void {
    if (this.multiSelect?.css?.includes('disabled')) {
      return;
    }
    this.opened = !this.opened;
    if (!this.multiSelect.iconToggle) {
      this.defaultIcon = {
        ...this.defaultIcon,
        cssContainer: this.opened
          ? [...(this.defaultIcon.cssContainer || []), 'active']
          : (this.defaultIcon?.cssContainer || []).filter(
              item => item !== 'active'
            ),
      };
    } else {
      this.multiSelect = {
        ...this.multiSelect,
        iconToggle: {
          ...this.multiSelect.iconToggle,
          cssContainer: this.opened
            ? [...(this.multiSelect.iconToggle?.cssContainer || []), 'active']
            : (this.multiSelect.iconToggle?.cssContainer || []).filter(
                item => item !== 'active'
              ),
        },
      };
    }
  }

  /**
   * Returns the classes for the Select DIV
   * @returns {string}
   */
  getSelectClass(): string {
    return (
      'd-flex justify-content-between form-control' +
      (this.shouldShowErrors() ? ' is-invalid' : '')
    );
  }

  /**
   * Returns the content of the select placeholder
   * @returns {string}
   */
  getContent(): string {
    if (this.formArray.controls.length > 0) {
      if (this.formArray.controls.length > 1) {
        return this.formArray.controls.length + ' seleccionados';
      }
      return this.multiSelect.option.filter(
        (option: IMultiSelectOption) =>
          option.value === this.formArray.controls[0].value
      )[0].text;
    }
    return this.multiSelect?.css?.includes('floating')
      ? ''
      : this.multiSelect.placeholder;
  }

  /**
   * Sets the selected value
   * @param {number} pos - The position of the option
   */
  setSelected(pos: number): void {
    const value = this.multiSelect.option[pos].value;
    const index = this.formArray.controls.findIndex(x => x.value === value);
    if (index >= 0) {
      this.formArray.removeAt(index);
    } else {
      this.formArray.push(new FormControl(value));
    }
    this.formArray.markAsDirty();
    if (this.multiSelect.autoReturn !== false) {
      this.multiSelectChanged.emit(true);
    }
  }

  /**
   * Returns the css classes for the select container as string
   * @returns {string}
   */
  getClass(): string {
    return [
      ...(this.multiSelect?.css ?? []),
      'select',
      'form-select_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the icon for the toggle
   * @returns {IIcon}
   */
  getToggleIcon(): IIcon {
    return this.multiSelect?.iconToggle ?? this.defaultIcon;
  }

  /**
   * Return css class too add to default input check-box
   * @param pos position
   * @returns {string}
   */
  getInputIconClass(pos: number): string {
    return [...(this.multiSelect?.option[pos].cssInput ?? []), 'select']
      .filter(Boolean)
      .join(' ');
  }

  getInputLabelClass(pos: number): string {
    return [...(this.multiSelect?.option[pos].cssLabel ?? []), 'select']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the filtered options
   * @returns {IMultiSelectOption[]}
   */
  getFilteredOptions(): IMultiSelectOption[] {
    if (this.multiSelect.search?.control.value) {
      return this.multiSelect.option.filter((option: IMultiSelectOption) =>
        option.value.includes(this.multiSelect.search?.control.value ?? '')
      );
    }
    return this.multiSelect.option;
  }

  /**
   * Called when the search input is changed - filters the options
   */
  onChanged(): void {
    this.getFilteredOptions();
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(css?: string): string {
    return [...(this.multiSelect?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.multiSelect?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.multiSelect?.label?.cssExtra ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  isRequiredClass(): string {
    return this.formArray.errors ? 'required' : '';
  }

  getSearchClass(): string {
    return [
      ...(this.multiSelect?.search?.css ?? []),
      ...(this.multiSelect?.cssOption ?? []),
      'list-group-item',
    ].join(' ');
  }

  getOptionClass(): string {
    return [
      ...(this.multiSelect?.cssOption ?? []),
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    ].join(' ');
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.multiSelect?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.formArray?.errors || !this.multiSelect?.errors) {
      return false;
    }
    if (
      this.multiSelect.errors.config?.startsInvalid === false &&
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
    if (!this.formArray.value.length && this.multiSelect?.errors) {
      return this.multiSelect?.errors?.messages?.required ?? '***: required';
    }

    return '';
  }
}
