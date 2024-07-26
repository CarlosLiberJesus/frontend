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
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  menu: IMenu = this.getMainMenu();

  constructor(
    private breadcrumbService: BreadcrumbsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb$
      .pipe(takeUntil(this.destroy$))
      .subscribe((breadcrumb: IAppBreadcrumb | null) => {
        const cleanedMenu = this.getMainMenu();

        if (breadcrumb) {
          cleanedMenu.items.map(item => {
            if (item.title === breadcrumb.title) {
              item.cssMenuItemClass = [
                ...(item.cssMenuItemLinkClass ?? []),
                'active',
              ];
            }
            item.items?.map(subItem => {
              if (subItem.title === breadcrumb.title) {
                item.cssMenuItemClass = [
                  ...(item.cssMenuItemClass ?? []),
                  'here',
                ];
                subItem.cssMenuItemLinkClass = [
                  ...(subItem.cssMenuItemLinkClass ?? []),
                  'active',
                ];
              }
            });
          });
        }
        this.menu = cleanedMenu;
        this.cdRef.detectChanges();
      });
  }

  private getMainMenu(): IMenu {
    return {
      name: 'frontend-main-menu',
      cssMenuClass: [
        'menu-row',
        'menu-primary',
        'menu-hover-bg-light-primary',
        'menu-rounded',
        'menu-gray-900',
        'menu-active-bg-primary',
        'menu-hover-bg-light-primary',
        'menu-here-bg-light-primary',
        'menu-show-bg-light-primary',
        'fw-semibold',
        'font-montserrat',
        'text-uppercase',
      ],
      items: [
        {
          title: 'Recursos',
          event: EEvent.CLICK,
          cssMenuItemClass: ['position-relative'],
          cssSubMenuClass: [
            'menu-sub-dropdown',
            'position-absolute',
            'top-100',
            'end-0',
            'w-200px',
          ],
          items: [
            {
              title: 'Documentação',
              slug: '/documentacao',
              iconLast: {
                library: 'fa-regular',
                value: 'fa-pen-to-square',
                css: ['fs-3'],
              },
            },
            {
              title: 'Biblioteca',
              slug: '/biblioteca',
              iconLast: {
                library: 'fa-regular',
                value: 'fa-copy',
                css: ['fs-3'],
              },
            },
            {
              title: 'Blogs',
              slug: '/blogs',
              iconLast: {
                library: 'bi',
                value: 'bi-envelope-at',
                css: ['fs-3'],
              },
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
