import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IIcon } from '../../base/icon/icon';
import { IAlert } from './alert';

@Component({
  selector: 'app-bootstrap-html-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() alert!: IAlert;
  closeIcon!: IIcon;

  showAlert = true;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  // TODO ?fix? cor fechar = cor icon
  getClass(): string {
    return [
      ...(this.alert.css ?? []),
      'alert',
      'd-flex',
      'align-items-center',
      'p-5',
      'alert_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  getTitleContainerClass(): string {
    return [...(this.alert.titleContainerCss ?? []), 'd-flex', 'flex-column']
      .filter(Boolean)
      .join(' ');
  }

  getTitleClass(): string {
    return [...(this.alert.titleCss ?? []), 'mb-1', 'fs-4', 'fw-bold']
      .filter(Boolean)
      .join(' ');
  }

  getButtonClass(): string {
    if (this.isDismissible()) {
      const color = this.alert?.icon?.css?.filter((elem: string) =>
        elem.startsWith('text-')
      );
      this.closeIcon = {
        library: 'bi',
        value: 'bi-x',
        css: ['fs-2x', color ? color[0] : ''],
      };
    }
    return [
      'position-absolute',
      'position-sm-relative',
      'm-2',
      'm-sm-0',
      'top-0',
      'end-0',
      'btn',
      'btn-icon',
      'ms-sm-auto',
    ].join(' ');
  }

  isDismissible(): boolean {
    return this.alert.css?.includes('alert-dismissible') ? true : false;
  }

  close(): void {
    this.showAlert = false;
  }
}
