import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EEvent } from 'src/modules/elements/elements';
import { IMenu } from 'src/modules/elements/navigation/menu/menu';

@Component({
  selector: 'app-main-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menu: IMenu = {
    name: 'frontend-menu-tests',
    cssMenuClass: ['menu-row', 'menu-primary', 'menu-hover-bg-light-primary'],
    items: [
      {
        title: 'Recursos',
        event: EEvent.HOVER,
        cssMenuItemClass: ['position-relative'],
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
}
