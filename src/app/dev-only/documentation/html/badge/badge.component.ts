import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BadgeModel } from './badge.model';
import { IBadge } from 'src/modules/elements/html/badge/badge';

@Component({
  selector: 'app-bootstrap-documentation-html-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationBadgeComponent {
  srcCode!: string;
  badge!: IBadge;

  constructor(public badgeModel: BadgeModel) {
    this.badgeModel.startForms();
    this.getBadge();
  }

  getBadge() {
    const badge: IBadge = {
      text: this.badgeModel.getValue('text'),
      css: [],
    };
    if (
      this.badgeModel.getValue('toggle') &&
      this.badgeModel.getValue('color')
    ) {
      badge.css?.push('badge-light-' + this.badgeModel.getValue('color'));
    } else if (this.badgeModel.getValue('color')) {
      badge.css?.push('badge-' + this.badgeModel.getValue('color'));
    }
    if (
      this.badgeModel.getValue('badge') !== undefined &&
      this.badgeModel.getValue('badge') !== 'null'
    ) {
      badge.css?.push(this.badgeModel.getValue('badge') ?? '');
    }

    this.badge = badge;
    this.srcCode = '\nIBadge = ' + JSON.stringify(badge, null, 2);
  }

  onChanged() {
    this.getBadge();
  }
}
