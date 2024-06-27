import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBadge } from './badge';

@Component({
  selector: 'app-bootstrap-html-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() badge!: IBadge;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the badge
   * @returns {string}
   */
  getClass(): string {
    return [...(this.badge.css ?? []), 'badge', 'badge_' + this.randomId]
      .filter(Boolean)
      .join(' ');
  }
}
