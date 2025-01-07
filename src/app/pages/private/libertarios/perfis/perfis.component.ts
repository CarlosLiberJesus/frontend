import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrl: './perfis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfisComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  breadcrumb: IAppBreadcrumb = {
    title: 'Perfis e Permissões',
    items: [
      {
        label: 'Libertários',
        link: '/libertarios',
      },
      {
        label: 'Perfis e Permissões',
      },
    ],
  };

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.pageService.setBreadcrumb(this.breadcrumb);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
