import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IAppBreadcrumb } from 'src/app/interfaces/breadcrumbs';
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

  menu: IMenu = {
    name: 'frontend-main-menu',
    cssMenuClass: [
      'menu-row',
      'menu-primary',
      'menu-hover-bg-light-primary',
      'menu-rounded',
      'menu-gray-600',
      'menu-active-bg-primary',
      'menu-hover-bg-light-primary',
      'menu-here-bg-light-primary',
      'menu-show-bg-light-primary',
      'fw-semibold',
    ],
    items: [
      {
        title: 'Recursos',
        event: EEvent.CLICK,
        cssMenuItemClass: ['position-relative', 'here'],
        cssSubMenuClass: [
          'menu-sub-dropdown',
          'position-absolute',
          'top-100',
          'start-0',
        ],
        items: [
          {
            title: 'Documentação',
            slug: '/documentacao',
            cssMenuItemLinkClass: ['active'],
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
  };

  constructor(
    private breadcrumbService: BreadcrumbsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb$
      .pipe(takeUntil(this.destroy$))
      .subscribe((breadcrumb: IAppBreadcrumb | null) => {
        const cleanedMenu = {
          ...this.menu,
          items: this.menu.items.map(item => ({
            ...item,
            cssMenuItemClass: item.cssMenuItemClass?.filter(
              cssClass => cssClass !== 'here'
            ),
            items: item.items?.map(subItem => ({
              ...subItem,
              cssMenuItemLinkClass: subItem.cssMenuItemLinkClass?.filter(
                cssClass => cssClass !== 'active'
              ),
            })),
          })),
        };

        if (breadcrumb) {
          console.log(breadcrumb);
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
