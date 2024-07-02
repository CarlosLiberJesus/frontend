import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { IButton } from 'src/modules/elements/html/button/button';
import {
  IMenu,
  IMenuClickEvent,
} from 'src/modules/elements/navigation/menu/menu';

@Component({
  selector: 'app-layout-header-toolbar-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  themeIcon: IButton = {
    spinner: {
      style: {
        css: ['me-1', 'text-dark', 'spinner-border', 'h-25px w-25px'],
      },
    },
  };
  themeMenu!: IMenu;
  showMenu = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.setTheme();
  }

  setTheme(): void {
    this.themeIcon = {
      css: [
        'mb-1 btn-icon btn-custom btn-icon-gray-900 btn-active-dark btn-active-color-ancap w-35px h-35px w-md-40px h-md-40px',
      ],
      iconFirst: {
        library: 'bi',
        value:
          localStorage.getItem('theme') === 'dark' ? 'bi-moon-stars' : 'bi-sun',
        css: ['fs-2 fw-semibold'],
      },
    };

    this.themeMenu = {
      name: 'menu-theme',
      autoReturn: true,
      cssMenuClass: [
        'position-absolute',
        'top-100',
        'end-0',
        'menu',
        'menu-column',
        'menu-rounded',
        'card',
        'menu-title-gray-700',
        'menu-icon-gray-900',
        'menu-active-bg',
        'menu-state-dark',
        'fw-semibold',
        'py-1',
        'fs-base',
        'w-125px',
        'z-index-3',
      ],
      items: [
        {
          title: 'Claro',
          cssMenuItemClass: [
            localStorage.getItem('theme') === 'light' ? 'bg-light-ancap' : '',
          ],
          cssMenuItemTitleClass: [
            localStorage.getItem('theme') === 'light'
              ? 'text-dark fw-bold'
              : '',
          ],
          iconFirst: {
            library: 'bi',
            value: 'bi-sun',
            css: [
              localStorage.getItem('theme') === 'light' ? ' text-dark ' : '',
              'fs-2',
              'me-2',
            ],
          },
        },
        {
          title: 'Escuro',
          cssMenuItemClass: [
            localStorage.getItem('theme') === 'dark' ? 'bg-light' : '',
          ],
          cssMenuItemTitleClass: [
            localStorage.getItem('theme') === 'dark'
              ? 'text-ancap fw-bold'
              : '',
          ],
          iconFirst: {
            library: 'bi',
            value: 'bi-moon-stars',
            css: [
              localStorage.getItem('theme') === 'dark' ? ' text-ancap ' : '',
              'fs-2',
              'me-2',
            ],
          },
        },
      ],
    };
  }

  changeTheme(event: IMenuClickEvent): void {
    let theme = 'light';
    if (event.menu === 1) {
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.setTheme();
    this.showMenu = false;
  }
}
