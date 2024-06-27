import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAvatar } from './avatar';

@Component({
  selector: 'app-bootstrap-html-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() avatar!: IAvatar;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  getClass(): string {
    return [...(this.avatar.css ?? []), 'symbol', 'avatar_' + this.randomId]
      .filter(Boolean)
      .join(' ');
  }

  getLabelClass(): string {
    return [...(this.avatar.labelCss ?? []), 'symbol-label']
      .filter(Boolean)
      .join(' ');
  }

  getBadgeClass(): string {
    return [
      ...(this.avatar.badge?.css ?? []),
      'symbol-badge',
      'badge',
      this.avatar.badge?.position === 'topLeft' ? 'start-0' : '',
      this.avatar.badge?.position === 'topRight' ? 'start-100' : '',
      this.avatar.badge?.position === 'bottomLeft' ? 'start-0 top-100' : '',
      this.avatar.badge?.position === 'bottomRight' ? 'top-100 start-100' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getImgAlt(): string {
    return this.avatar.imgAlt ?? '';
  }
}
