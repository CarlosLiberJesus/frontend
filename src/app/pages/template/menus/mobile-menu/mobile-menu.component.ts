import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EEvent } from 'src/modules/elements/elements';
import { IMenu } from 'src/modules/elements/navigation/menu/menu';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {

  //TODO Repicar filhos
  menu: IMenu = {
    name: 'frontend-menu-tests',
    cssMenuClass: [
      'menu-column',
      'w-150px',
      'menu-primary',
      'menu-hover-bg-light-primary',
    ],
    items: [
      {
        iconLast: {
          library: 'socicon',
          value: 'socicon-rss',
          css: ['fs-6', 'ms-2', 'text-primary'],
        },
        event: EEvent.CLICK,
        cssMenuItemClass: ['position-relative'],
        cssSubMenuClass: [
          'menu-sub-dropdown w-100px',
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
              'menu-sub-dropdown w-100px',
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
                title: 'Documenção1',
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
