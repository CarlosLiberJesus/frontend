import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBullets } from './bullets';

@Component({
  selector: 'app-bootstrap-html-bullets',
  templateUrl: './bullets.component.html',
  styleUrls: ['./bullets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulletsComponent {
  @Input() bullets!: IBullets;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  getBulletsContainerClass(): string {
    return [...(this.bullets?.cssContainer ?? []), 'bullets_' + this.randomId]
      .filter(Boolean)
      .join(' ');
  }

  getLiClass(): string {
    return [...(this.bullets?.cssLi ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for bullet elem
   * @returns {string}
   */
  getClass(pos: number): string {
    if (this.bullets) {
      return [
        ...this.bullets.bullets[pos].css,
        'bullet',
        'bullet_' + this.randomId,
      ]
        .filter(Boolean)
        .join(' ');
    }
    return '';
  }
}
