import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IButton } from './button';
import { EEvent, EPosition } from '../../elements';
import { IPopOver } from '../../base/pop-over/pop-over';

@Component({
  selector: 'app-bootstrap-html-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() button!: IButton;
  @Output() clicked = new EventEmitter<boolean>();

  popOver!: IPopOver | null;
  @ViewChild('target', { static: false }) targetElement!: ElementRef;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the button
   * @returns {string}
   */
  getClass(): string {
    return [
      ...(this.button.css ?? []),
      'btn',
      'btn_' + this.randomId,
      this.button.name ?? '',
      this.button?.popOver !== undefined ? 'd-inline-flex' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getBadgeClass(): string {
    return [
      ...(this.button.badge?.css ?? []),
      this.button.badge?.position === 'topLeft'
        ? 'position-absolute top-0 start-0 translate-middle'
        : '',
      this.button.badge?.position === EPosition.TOPRIGHT
        ? 'position-absolute top-0 start-100 translate-middle'
        : '',
      this.button.badge?.position === EPosition.BOTTOMLEFT
        ? 'position-absolute top-100 start-0 translate-middle'
        : '',
      this.button.badge?.position === EPosition.BOTTOMRIGHT
        ? 'position-absolute top-100 start-100 translate-middle'
        : '',
      'badge',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getColorClass(): string {
    return [...(this.button.color?.css ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Triggers event
   */
  click(): void {
    if (this.button.popOver && this.button.popOver?.event === EEvent.CLICK) {
      if (!this.popOver) {
        this.popOver = this.button.popOver;
      } else {
        this.popOver = null;
      }
    }
    if (this.button?.autoReturn !== false) {
      this.clicked.emit(true);
    }
    if (this.button.iconFirst?.cssContainer?.includes('rotate')) {
      if (this.button.iconFirst?.cssContainer?.includes('active')) {
        this.button.iconFirst = {
          ...this.button.iconFirst,
          cssContainer: this.button.iconFirst?.cssContainer.filter(
            cssClass => cssClass !== 'active'
          ),
        };
      } else {
        this.button.iconFirst = {
          ...this.button.iconFirst,
          cssContainer: [
            ...(this.button.iconFirst?.cssContainer ?? []),
            'active',
          ],
        };
      }
    }

    if (this.button.iconLast?.cssContainer?.includes('rotate')) {
      if (this.button.iconLast?.cssContainer?.includes('active')) {
        this.button.iconLast = {
          ...this.button.iconLast,
          cssContainer: this.button.iconLast?.cssContainer.filter(
            cssClass => cssClass !== 'active'
          ),
        };
      } else {
        this.button.iconLast = {
          ...this.button.iconLast,
          cssContainer: [
            ...(this.button.iconLast?.cssContainer ?? []),
            'active',
          ],
        };
      }
    }
  }

  /**
   * @deprecated from now on
   *
   * to create the popOver with over, it block the click event
   */
  hoverEnter(event: MouseEvent): void {
    if (this.button.popOver && this.button.popOver?.event === EEvent.HOVER) {
      this.popOver = this.button.popOver;
    }
    event.preventDefault(); // Stop the event propagation
  }

  hoverLeave(event: MouseEvent): void {
    if (this.button.popOver && this.button.popOver?.event === EEvent.HOVER) {
      this.popOver = null;
    }
    event.stopPropagation();
  }

  mobileEnter(_event: TouchEvent): void {
    if (this.button.popOver && this.button.popOver?.event === EEvent.HOVER) {
      this.popOver = this.button.popOver;
    }
  }

  mobileLeave(_event: TouchEvent): void {
    if (this.button.popOver && this.button.popOver?.event === EEvent.HOVER) {
      this.popOver = null;
    }
  }
}
