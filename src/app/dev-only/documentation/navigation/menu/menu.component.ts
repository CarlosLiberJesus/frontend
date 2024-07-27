import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IMenu } from 'src/modules/elements/navigation/menu/menu';
import { MenuModel } from './menu.model';
import { EEvent } from 'src/modules/elements/elements';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-navigation-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationMenuComponent implements OnInit {
  menu!: IMenu;
  srcCode!: string;

  directionOptions!: IRadioList;
  openOptions!: IRadioList;

  constructor(
    public menuModel: MenuModel,
    private cdr: ChangeDetectorRef
  ) {
    this.menuModel.startForms();
  }

  ngOnInit(): void {
    this.directionOptions = this.menuModel.getDirectionOptions();
    this.openOptions = this.menuModel.getOpenOptions();
    this.startMenu();
  }

  startMenu() {
    const lang = 'Opções';
    this.menu = {
      name: 'frontend-menu-tests',
      cssMenuClass: this.getMenuClass(),
      // cssSubSubMenuClass: [this.menuModel.getValue('levelthree')],
      items: [
        {
          title: lang + ' 1',
          badge: {
            text: '+9',
            css: [
              'badge-warning',
              'badge-circle badge-outline',
              'd-none',
              'd-sm-block',
              'pt-3',
            ],
          },
          event:
            this.menuModel.getValue('openControl') === EEvent.CLICK
              ? EEvent.CLICK
              : EEvent.HOVER,
          //direction: EPosition.BOTTOM,
          cssMenuItemClass: ['position-relative'],
          cssSubMenuClass: [
            this.menuModel.getValue('leveltwo'),
            'position-absolute',
            'top-100',
            'start-0',
          ],
          items: [
            { title: lang + ' 1.1' },
            {
              title: lang + ' 1.2',
              event:
                this.menuModel.getValue('openControl') === EEvent.CLICK
                  ? EEvent.CLICK
                  : EEvent.HOVER,
              cssMenuItemClass: ['position-relative'],
              cssSubMenuClass: [
                this.menuModel.getValue('leveltwo'),
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
                { title: lang + ' 1.2.1' },
                { title: lang + ' 1.2.2' },
                { title: lang + ' 1.2.3' },
              ],
            },
            {
              title: lang + ' 1.3',
              event:
                this.menuModel.getValue('openControl') === EEvent.CLICK
                  ? EEvent.CLICK
                  : EEvent.HOVER,
              //direction: EPosition.BOTTOM,
              items: [
                { title: lang + ' 1.3.1' },
                { title: lang + ' 1.3.2' },
                { title: lang + ' 1.3.3' },
              ],
            },
            { title: lang + ' 1.4' },
          ],
        },
        {
          title: lang + ' 2',
          iconLast: {
            library: 'socicon',
            value: 'socicon-rss',
            css: [
              'fs-6',
              'ms-2',
              'text-' + this.menuModel.getValue('colorControl'),
            ],
          },
          event:
            this.menuModel.getValue('openControl') === EEvent.CLICK
              ? EEvent.CLICK
              : EEvent.HOVER,
          //direction: EPosition.BOTTOM,
          cssMenuItemClass: ['position-relative'],
          cssSubMenuClass: [
            this.menuModel.getValue('leveltwo'),
            'position-absolute',
            'top-100',
            'start-0',
          ],
          items: [
            { title: lang + ' 2.1' },
            { title: lang + ' 2.2' },
            { title: lang + ' 2.3' },
          ],
        },
        {
          title: lang + ' 3',
        },
      ],
    };
    this.srcCode = '\nIMenu = ' + JSON.stringify(this.menu, null, 2);
  }

  getMenuClass(): string[] {
    const cssClasses: string[] = [];
    if (this.menuModel.getValue('directionControl')) {
      cssClasses.push(this.menuModel.getValue('directionControl'));
      if (this.menuModel.getValue('directionControl') === 'menu-column') {
        cssClasses.push('w-150px');
      }
    }
    cssClasses.push('menu-' + this.menuModel.getValue('colorControl'));
    cssClasses.push('menu-hover-bg-light-primary');
    this.menuModel.getControl('mainCss').setValue(cssClasses.join(' '));
    return cssClasses;
  }

  onChangedText(_event: string, controlName: string) {
    const newValue = this.menuModel.getValue(controlName).split(' ');
    switch (controlName) {
      case 'mainCss':
        this.menu = { ...this.menu, cssMenuClass: newValue };
        break;
      case 'leveloneitem':
        this.menu.items.map(cs => {
          cs.cssMenuItemClass = newValue;
          return cs;
        });
        break;
      case 'levelonetitle':
        this.menu.items.map(cs => {
          cs.cssMenuItemTitleClass = newValue;
          return cs;
        });
        break;
      case 'levelonelink':
        this.menu.items.map(cs => {
          cs.cssMenuItemLinkClass = newValue;
          return cs;
        });
        break;
    }
    this.srcCode = '\nIMenu = ' + JSON.stringify(this.menu, null, 2);
  }

  onChange() {
    this.startMenu();
    //this.cdr.detectChanges();
  }
}
