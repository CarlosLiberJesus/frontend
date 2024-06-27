import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IRangeSlider } from './range-slider';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-bootstrap-forms-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderComponent implements AfterViewInit {
  @Input() control!: FormControl;
  @Input() rangeSlider!: IRangeSlider;
  @Output() sliderChanged = new EventEmitter<boolean>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * ngAfterViewInit is called after the component's view has been initialized.
   * Inicializes a listener for the value changes of the control
   */
  ngAfterViewInit(): void {
    if (this.rangeSlider?.css?.includes('disabled')) {
      this.control.disable();
    }
    if (this.rangeSlider?.autoReturn !== false) {
      this.control?.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.sliderChanged.emit(true);
      });
    }
  }

  /**
   * Checks if the range slider is disabled
   * @returns {boolean}
   */
  isDisabled(): boolean {
    return this.rangeSlider?.css?.includes('disabled') ?? false;
  }

  /**
   * Returns the css classes for the container as string
   * @return {string}
   */
  getClass(): string {
    return [...(this.rangeSlider?.css ?? []), 'form-range']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelClass(css?: string): string {
    return [...(this.rangeSlider?.label?.css ?? []), css, 'form-label']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the label
   * @returns {string}
   */
  getLabelTextClass(): string {
    return [
      ...(this.rangeSlider?.label?.css ?? []),
      'align-items-center',
      'd-flex',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelExtraClass(): string {
    return [...(this.rangeSlider?.label?.cssExtra ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  isRequiredClass(): string {
    return this.control.errors ? 'required' : '';
  }

  /**
   * Returns the css classes for the container as string
   * @returns {string}
   */
  getContainerClass(): string {
    return [
      ...(this.rangeSlider?.cssContainer ?? []),
      '',
      this.rangeSlider?.css?.includes('disabled') ? 'text-muted' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the value
   * @returns {string}
   */
  getPlaceholderClass(): string {
    return [...(this.rangeSlider?.cssValue ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the value
   * @returns {string}
   */
  getValueClass(): string {
    return [...(this.rangeSlider?.cssValue ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the msg
   * @returns {string}
   */
  getMessageClass(): string {
    return [...(this.rangeSlider?.message?.css ?? []), 'form-text']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the position of the selected value as text
   * @return {string}
   */
  getPositionSelectedAsText(): string {
    return this.rangeSlider?.valuesList?.[this.control.value];
  }
}
