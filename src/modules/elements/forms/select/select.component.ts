import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOption, ISelect } from './select';
import { IIcon } from '../../base/icon/icon';
import { IAvatar } from '../../base/avatar/avatar';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
@Component({
  selector: 'app-bootstrap-forms-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() control!: FormControl;
  @Input() select!: ISelect;
  @Output() selectChanged = new EventEmitter<boolean>();

  defaultIcon: IIcon = {
    library: 'fa-solid',
    value: 'fa-angle-down',
    css: ['fs-2', 'rotate-180', 'ms-2'],
    cssContainer: ['rotate d-flex'],
  };

  opened = false;
  randomId: string = this.trimTrailingZeros(Math.random().toString());

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.opened = false;
      if (!this.select.iconToggle) {
        this.defaultIcon = {
          ...this.defaultIcon,
          cssContainer: (this.defaultIcon?.cssContainer || []).filter(
            item => item !== 'active'
          ),
        };
      } else {
        this.select = {
          ...this.select,
          iconToggle: {
            ...this.select.iconToggle,
            cssContainer: (this.select.iconToggle?.cssContainer || []).filter(
              item => item !== 'active'
            ),
          },
        };
      }
    }
  }

  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Toggles the select - shows dropdown or hides
   */
  toggle(): void {
    if (this.select?.css?.includes('disabled')) {
      return;
    }
    this.opened = !this.opened;

    if (!this.select.iconToggle) {
      this.defaultIcon = {
        ...this.defaultIcon,
        cssContainer: this.opened
          ? [...(this.defaultIcon.cssContainer || []), 'active']
          : (this.defaultIcon?.cssContainer || []).filter(
              item => item !== 'active'
            ),
      };
    } else {
      this.select = {
        ...this.select,
        iconToggle: {
          ...this.select.iconToggle,
          cssContainer: this.opened
            ? [...(this.select.iconToggle?.cssContainer || []), 'active']
            : (this.select.iconToggle?.cssContainer || []).filter(
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
      (this.shouldShowErrors() ? ' is-invalid' : '') +
      (this.select?.css?.includes('form-control-solid')
        ? ' form-control-solid'
        : '')
    );
  }

  getSelectOptionClass(pos: number): string {
    return [
      ...(this.select?.cssOption ?? []),
      ...(this.select?.option[pos].css ?? []),
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the content of the select placeholder
   * @returns {string}
   */
  getContent(): string {
    if (this.control?.value) {
      return this.select?.option.filter(
        (option: IOption) => option.value === this.control.value
      )[0].text;
    }
    return this.select?.css?.includes('floating')
      ? ''
      : this.select.placeholder ?? '';
  }

  /**
   * Sets the selected value
   * @param {number} pos - The position of the option
   */
  setSelected(pos: number): void {
    const selectedValue = this.control.value;
    const clickedValue = this.select.option[pos].value;

    if (this.select?.css?.includes('unselect')) {
      this.control.setValue(
        selectedValue === clickedValue ? null : clickedValue
      );
    } else {
      this.control.setValue(clickedValue);
    }
    this.control.markAsDirty();
    this.opened = false;
    if (this.select.autoReturn !== false) {
      this.selectChanged.emit(true);
    }
  }

  /**
   * Returns the css classes for the select container as string
   * @returns {string}
   */
  getClass(): string {
    return [
      ...(this.select?.css ?? []),
      'select',
      'form-select_' + this.randomId,
    ].join(' ');
  }

  /**
   * Prepares the color icon for the select
   * @returns
   */
  getColor(): string {
    if (this.control.value) {
      return (
        this.select.option.filter(
          (option: IOption) => option.value === this.control.value
        )[0].color ?? ''
      );
    }
    return '';
  }

  hasOptionIcon(): boolean {
    if (this.control.value) {
      return this.select.option.filter(
        (option: IOption) => option.value === this.control.value
      )[0].icon
        ? true
        : false;
    }
    return false;
  }

  getOptionSelectedIcon(): IIcon {
    return this.select.option.filter(
      (option: IOption) => option.value === this.control.value
    )[0].icon!;
  }

  hasAvatarIcon(): boolean {
    if (this.control.value) {
      return this.select.option.filter(
        (option: IOption) => option.value === this.control.value
      )[0].avatar
        ? true
        : false;
    }
    return false;
  }

  getAvatarSelectedIcon(): IAvatar {
    return this.select.option.filter(
      (option: IOption) => option.value === this.control.value
    )[0].avatar!;
  }

  /**
   * Returns the icon for the toggle
   * @returns {IIcon}
   */
  getToggleIcon(): IIcon {
    return this.select?.iconToggle ?? this.defaultIcon;
  }

  /**
   * Returns the filtered options
   * @returns {IOption[]}
   */
  getFilteredOptions(): IOption[] {
    if (this.select.search?.control.value) {
      return this.select.option.filter((option: IOption) =>
        option.value.includes(this.select.search?.control.value ?? '')
      );
    }
    return this.select.option;
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
    return [...(this.select?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [...(this.select?.label?.css ?? []), 'align-items-center', 'd-flex']
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.select?.label?.cssExtra ?? [])].filter(Boolean).join(' ');
  }

  isRequiredClass(): string {
    return this.control.errors ? 'required' : '';
  }

  getSearchClass(): string {
    return [
      ...(this.select?.search?.css ?? []),
      ...(this.select?.cssOption ?? []),
      'list-group-item',
    ].join(' ');
  }

  getOptionClass(value: string): string {
    return [
      ...(this.select?.cssOption ?? []),
      value === this.control.value && this.select.css?.includes('active')
        ? 'active'
        : '',
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
    return [...(this.select?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Checks if the input has errors
   * @returns {boolean} true if the input has errors
   */
  shouldShowErrors(): boolean {
    if (!this.control?.errors || !this.select?.errors) {
      return false;
    }
    if (
      this.select.errors.config?.startsInvalid === false &&
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
    if (!this.control.value && this.select?.errors) {
      return this.select?.errors?.messages?.required ?? '***: required';
    }

    return '';
  }
}
