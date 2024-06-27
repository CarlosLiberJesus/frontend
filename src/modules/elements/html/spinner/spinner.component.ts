import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISpinner } from './spinner';

@Component({
  selector: 'app-bootstrap-html-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() spinner!: ISpinner | undefined;

  getSpinnerContainerClass(): string {
    return [
      ...(this.spinner?.cssContainer ?? []),
      'd-flex',
      'align-items-center',
      'justify-content-center',
      this.spinner?.name ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the Spinner
   * @returns {string}
   */
  getStyle(): string {
    return [...(this.spinner?.style?.css ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns a message to go with Spinner
   * @returns {string}
   */
  getText(): string {
    return this.spinner?.placeholder?.text ?? '';
  }

  getPlaceholderClass(): string {
    return [
      ...(this.spinner?.placeholder?.css ?? []),
      this.spinner?.placeholder === undefined ? 'visually-hidden' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getAnimationClass(): string {
    return [...(this.spinner?.animation?.css ?? [])].filter(Boolean).join(' ');
  }
}
