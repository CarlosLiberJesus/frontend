import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBreadcrumbs } from './breadcrumbs';

@Component({
  selector: 'app-bootstrap-navigation-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs!: IBreadcrumbs;

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  getBreadcrumbClass(): string {
    return [
      ...(this.breadcrumbs.css ?? []),
      'breadcrumb',
      'breadcrumb_' + this.randomId,
    ].join(' ');
  }

  getBreadcrumbItemCss(pos: number): string {
    return [
      ...(this.breadcrumbs.items[pos].cssItem ?? []),
      'breadcrumb-item',
    ].join(' ');
  }

  getBreadcrumbLinkCss(pos: number): string {
    return [...(this.breadcrumbs.items[pos].cssLink ?? [])].join(' ');
  }
}
