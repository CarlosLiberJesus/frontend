import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { EEvent } from 'src/modules/elements/elements';
import { IMenu } from 'src/modules/elements/navigation/menu/menu';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  menu: IMenu = this.getMobileMenu();

  constructor(
    private breadcrumbService: BreadcrumbsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb$
      .pipe(takeUntil(this.destroy$))
      .subscribe((breadcrumb: IAppBreadcrumb | null) => {
        const cleanedMenu = this.getMobileMenu();

        if (breadcrumb) {
          cleanedMenu.items[0].items?.forEach(item => {
            if (item.items) {
              item.items.forEach(subItem => {
                if (subItem.title === breadcrumb.title) {
                  item.cssMenuItemClass = [
                    ...(item.cssMenuItemClass ?? []),
                    'here',
                  ];
                  item.cssMenuItemLinkClass = [
                    ...(item.cssMenuItemLinkClass ?? []),
                    'here',
                  ];
                  subItem.cssMenuItemLinkClass = [
                    ...(subItem.cssMenuItemLinkClass ?? []),
                    'active',
                  ];
                }
              });
            }
            if (item.title === breadcrumb.title) {
              item.cssMenuItemClass = [
                ...(item.cssMenuItemLinkClass ?? []),
                'active',
              ];
            }
          });
        }
        this.menu = cleanedMenu;
        this.cdRef.detectChanges();
      });
  }

  private getMobileMenu(): IMenu {
    return {
      name: 'frontend-mobile-menu',
      cssMenuClass: [
        'menu-primary',
        'menu-rounded',
        'menu-gray-900',
        'menu-active-bg-primary',
        'menu-hover-bg-light-primary',
        'menu-here-bg-light-primary',
        'menu-show-bg-light-primary',
        'fw-semibold',
        'menu-hide-arrow-layer-1',
        'fs-2',
      ],
      items: [
        {
          iconLast: {
            library: 'bi',
            value: 'bi-menu-up',
            css: ['fs-1', 'ms-2', 'text-gray-900'],
          },
          event: EEvent.CLICK,
          cssMenuItemClass: ['position-relative'],
          cssSubMenuClass: [
            'menu-sub-dropdown w-150px',
            'position-absolute',
            'top-100',
            'start-0',
          ],
          items: [
            {
              title: 'Recursos',
              event: EEvent.HOVER,
              cssMenuItemClass: ['position-relative'],
              cssSubMenuClass: [
                'menu-sub-dropdown w-150px',
                'position-absolute',
                'top-0',
                'start-100',
              ],
              button: {
                css: ['p-0', 'ps-2'],
                iconFirst: {
                  library: 'bi',
                  value: 'bi-chevron-right',
                  cssContainer: ['rotate'],
                  css: ['rotate-180'],
                },
              },
              items: [
                {
                  title: 'Documentação',
                  slug: '/documentacao',
                },
                {
                  title: 'Biblioteca',
                  slug: '/biblioteca',
                },
                {
                  title: 'Blogs',
                  slug: '/blogs',
                },
              ],
            },
          ],
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
