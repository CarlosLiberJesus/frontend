import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { delay, Subject, takeUntil } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { Title } from '@angular/platform-browser';
import { IBreadcrumbs } from 'src/modules/elements/navigation/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  pageTitle: string | null = null;
  breadcrumbs: IBreadcrumbs | null = null;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private titleService: Title,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const pageTabTitle = 'Futuro Partido Libertário';

    this.breadcrumbsService.breadcrumb$
      .pipe(takeUntil(this.destroy$), delay(500))
      .subscribe((breadcrumb: IAppBreadcrumb | null) => {
        this.breadcrumbs = null;
        this.pageTitle = null;
        if (breadcrumb) {
          this.pageTitle = breadcrumb.title;

          this.breadcrumbs = {
            name: 'site-breadcrumbs',
            css: [
              'breadcrumb-line',
              'fw-semibold',
              'fs-7',
              'my-0',
              'pt-1',
              'text-muted',
            ],
            items: (breadcrumb.items || []).filter(Boolean).map(item => {
              return {
                title: item.label,
                slug: item.link ?? undefined,
                fragment: item.fragment ?? undefined,
                cssLink: [
                  'text-muted',
                  item.link
                    ? 'cursor-pointer text-hover-ancap'
                    : 'cursor-default',
                ],
              };
            }),
          };
        }
        // TODO at this point should update <meta>
        this.titleService.setTitle(
          this.pageTitle ? pageTabTitle + ' | ' + this.pageTitle : pageTabTitle
        );
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
