import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IIcon } from './icon';
import { IPopOver } from '../pop-over/pop-over';
import { EEvent } from '../../elements';

@Component({
  selector: 'app-bootstrap-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() icon!: IIcon;
  @Output() popOverClosed = new EventEmitter<boolean>();

  popOver!: IPopOver | null;
  first = true;
  @ViewChild('target', { static: false }) targetElement!: ElementRef;

  randomId: string = this.trimTrailingZeros(Math.random().toString());

  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  getIconContainerClass(): string {
    return [
      this.icon?.name ?? '',
      'icon_' + this.randomId,
      this.icon?.popOver !== undefined ? 'd-inline-flex' : '',
      ...(this.icon?.cssContainer ?? []),
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the icon as string
   * @returns {string}
   */
  getIcon(): string {
    if (this.icon) {
      return [...(this.icon.css ?? []), this.icon.library, this.icon.value]
        .filter(Boolean)
        .join(' ');
    }
    return '';
  }

  /**
   * Returns the the flag path to svg
   * @returns {string}
   */
  getFlag(): string {
    return 'assets/media/flags/' + this.icon?.value + '.svg';
  }

  /**
   * Returns the css classes for the flag as string
   * @returns {string}
   */
  getFlagCss(): string {
    if (this.icon) {
      return [...(this.icon.css ?? []), this.icon.name ?? '']
        .filter(Boolean)
        .join(' ');
    }
    return '';
  }

  getBase64Css(): string {
    if (this.icon) {
      return [...(this.icon.css ?? []), this.icon.name ?? '']
        .filter(Boolean)
        .join(' ');
    }
    return '';
  }

  clicked(): void {
    if (this.icon.popOver && this.icon.popOver?.event === EEvent.CLICK) {
      if (!this.popOver) {
        this.popOver = this.icon.popOver;
      } else {
        this.popOver = null;
      }
    }
  }

  hoverEnter(
    event: MouseEvent | TouchEvent,
    _options?: { passive: boolean }
  ): void {
    if (this.icon.popOver && this.icon.popOver?.event === EEvent.HOVER) {
      this.popOver = this.icon.popOver;
    }
    event.preventDefault();
  }

  hoverLeave(_event: MouseEvent | TouchEvent): void {
    if (this.icon.popOver && this.icon.popOver?.event === EEvent.HOVER) {
      this.popOver = null;
    }
  }
}
