import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISeparator } from './separator';

@Component({
  selector: 'app-bootstrap-html-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorComponent {
  @Input() separator!: ISeparator;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  getClass(): string {
    return [
      ...(this.separator.css ?? []),
      'separator',
      'separator_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  getLabelClass(): string {
    return [...(this.separator.labelCss ?? [])].filter(Boolean).join(' ');
  }
}
