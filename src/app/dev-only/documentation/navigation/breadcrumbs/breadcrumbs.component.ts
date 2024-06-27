import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IBreadcrumbs } from 'src/modules/elements/navigation/breadcrumbs/breadcrumbs';
import { BreadcrumbsModel } from './breadcrumbs.model';

@Component({
  selector: 'app-bootstrap-documentation-navigation-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationBreadcrumbsComponent {
  breadcrumbs!: IBreadcrumbs;
  srcCode!: string;

  constructor(public breadcrumbsModel: BreadcrumbsModel) {
    this.breadcrumbsModel.startForms();
    this.startBreadcrumbs();
  }

  startBreadcrumbs(): void {
    this.breadcrumbs = {
      name: 'breadcrumbs-demo',
      items: [
        {
          title: 'Item 1',
        },
        {
          title: 'Item 2',
        },
        {
          title: 'Item 3',
        },
      ],
      css: [this.breadcrumbsModel.getValue('style') ?? ''].filter(Boolean),
    };
    this.srcCode =
      '\nIBreadcrumbs = ' + JSON.stringify(this.breadcrumbs, null, 2);
  }

  onChange(): void {
    this.startBreadcrumbs();
  }
}
