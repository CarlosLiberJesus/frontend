import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IMenu, IMenuClickEvent } from './menu';
import { IButton } from '../../html/button/button';
import { EEvent } from '../../elements';
import { IIcon } from '../../base/icon/icon';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
@Component({
  selector: 'app-bootstrap-navigation-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnChanges {
  @Input() menu!: IMenu;
  @Output() clicked = new EventEmitter<IMenuClickEvent>();

  isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  defaultToggle: IButton = {
    css: ['d-flex', 'p-0', 'ps-2'],
    iconFirst: {
      library: 'bi',
      value: 'bi-chevron-down',
      css: ['fs-6', 'me-2', 'rotate-180'],
      cssContainer: ['rotate'],
    },
  };
  checkedButtons = false;

  constructor(private elementRef: ElementRef) {}

  /**
   * Closes all menu with name tabs when the user clicks outside
   * @param event - The click event
   */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      const target = event.target as HTMLElement;
      if (
        !Array.from(target.classList).some(
          className => className === this.menu.name
        ) &&
        !this.isElementOrDescendantOfElement(
          target,
          'app-bootstrap-html-badge'
        ) &&
        !this.isElementOrDescendantOfElement(
          target,
          'app-bootstrap-html-button'
        ) &&
        !this.isElementOrDescendantOfElement(target, 'app-bootstrap-icon')
      ) {
        this.closeAll();
      }
    }
  }

  /**
   * A function to check if the element or any of its ancestors match a given tag name.
   *
   * @param {HTMLElement} element - The element to start the check from.
   * @param {string} tagName - The tag name to match against.
   * @return {boolean} Whether the element or any of its ancestors match the given tag name.
   */
  private isElementOrDescendantOfElement(
    element: HTMLElement,
    tagName: string
  ): boolean {
    if (element.tagName.toLowerCase() === tagName) {
      return true;
    } else {
      return element.parentElement
        ? this.isElementOrDescendantOfElement(element.parentElement, tagName)
        : false;
    }
  }

  ngOnChanges(): void {
    this.menu.items = this.menu.items.map(subMenu => ({
      ...subMenu,
      button:
        subMenu.items?.length &&
        !subMenu.button &&
        !subMenu.cssSubMenuClass?.includes('no-toggle')
          ? this.defaultToggle
          : subMenu.button,
      items: (subMenu.items || []).map(subMenuItem => ({
        ...subMenuItem,
        button:
          subMenuItem.items?.length &&
          !subMenuItem.button &&
          !subMenu.cssSubMenuClass?.includes('no-toggle')
            ? this.defaultToggle
            : subMenuItem.button,
      })),
    }));
  }

  /**
   * Returns the css classes for the menu container
   * @returns {string}
   */
  getMenuClass(): string {
    return [...(this.menu?.cssMenuClass ?? []), 'menu', this.menu?.name].join(
      ' '
    );
  }

  /**
   * Returns the css classes for the SubMenu
   * @param pos - The position of the menu
   * @returns {string}
   */
  getSubMenuContainerClass(pos: number): string {
    const css = [
      ...(this.menu?.items?.[pos]?.cssSubMenuClass ?? []),
      'menu-sub',
      'menu-sub_' + this.menu.name + '_' + pos,
      this.menu?.name,
      this.isSubMenuOpen(pos),
      this.isSubMenuOpen(pos) ? '' : '',
    ];
    return css.filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the SubMenu
   * @param pos - The position of the menu
   * @returns {string}
   */
  getSubSubMenuContainerClass(menu: number, subMenu: number): string {
    const css = [
      ...(this.menu?.items?.[menu]?.items?.[subMenu]?.cssSubMenuClass ?? []),
      'menu-sub',
      'menu-sub_' + this.menu.name + '_' + menu + '_' + subMenu,
      this.menu?.name,
      this.isSubSubMenuOpen(menu, subMenu),
      this.isSubSubMenuOpen(menu, subMenu) ? '' : 'd-none',
    ];
    return css.filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the menu item
   * @param menuItem - The position of the menu
   * @param subMenuItem - The position of the submenu
   * @returns {string}
   */
  getMenuItemClass(
    menuItem: number,
    subMenuItem?: number,
    subSubMenuItem?: number
  ): string {
    const css: string[] = ['menu-item', this.menu.name];
    if (subMenuItem !== undefined && subSubMenuItem !== undefined) {
      css.push(
        'menu-layer-3',
        'menu-item_' +
          this.menu.name +
          '_' +
          menuItem +
          '_' +
          subMenuItem +
          '_' +
          subSubMenuItem
      );
      const classes =
        this.menu?.items[menuItem].items?.[subMenuItem]?.items?.[
          subSubMenuItem
        ]?.cssMenuItemLinkClass?.join(' ') ?? '';
      if (classes) {
        css.push(classes);
      }
    } else if (subMenuItem !== undefined) {
      css.push(
        'menu-layer-2',
        'menu-item_' + this.menu.name + '_' + menuItem + '_' + subMenuItem,
        this.menu?.items[menuItem].items?.[subMenuItem]?.cssMenuItemClass?.join(
          ' '
        ) ?? ''
      );
    } else {
      css.push(
        'menu-layer-1',
        'menu-item_' + this.menu.name + '_' + menuItem,
        this.menu?.items[menuItem].cssMenuItemClass?.join(' ') ?? ''
      );
    }
    return css.filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the menu link
   * @param menuItem - The position of the menu
   * @param subMenuItem - The position of the submenu
   * @returns {string}
   */
  getMenuItemLinkClass(
    menuItem: number,
    subMenuItem?: number,
    subSubMenuItem?: number
  ): string {
    const css: string[] = ['menu-link', this.menu.name];
    if (subMenuItem !== undefined && subSubMenuItem !== undefined) {
      css.push(
        this.menu?.items[menuItem].items?.[subMenuItem]?.items?.[
          subSubMenuItem
        ]?.cssMenuItemLinkClass?.join(' ') ?? ''
      );
    } else if (subMenuItem !== undefined) {
      css.push(
        this.menu?.items[menuItem].items?.[
          subMenuItem
        ]?.cssMenuItemLinkClass?.join(' ') ?? ''
      );
    } else {
      css.push(
        this.menu?.items[menuItem].cssMenuItemLinkClass?.join(' ') ?? ''
      );
    }
    return css.filter(Boolean).join(' ');
  }

  /**
   * Returns the css classes for the menu text
   * @param menuItem - The position of the menu
   * @param subMenuItem - The position of the submenu
   * @returns {string}
   */
  getMenuItemTitleClass(
    menuItem: number,
    subMenuItem?: number,
    subSubMenuItem?: number
  ): string {
    const css: string[] = ['menu-title', this.menu.name];
    if (subMenuItem !== undefined && subSubMenuItem !== undefined) {
      css.push(
        this.menu?.items[menuItem].items?.[subMenuItem]?.items?.[
          subSubMenuItem
        ]?.cssMenuItemTitleClass?.join(' ') ?? ''
      );
    } else if (subMenuItem !== undefined) {
      css.push(
        this.menu?.items[menuItem].items?.[
          subMenuItem
        ]?.cssMenuItemTitleClass?.join(' ') ?? ''
      );
    } else {
      css.push(
        this.menu?.items[menuItem].cssMenuItemTitleClass?.join(' ') ?? ''
      );
    }
    return css.filter(Boolean).join(' ');
  }

  /**
   * Returns the open method
   * @param pos - The position of the menu
   * @returns {string|undefined}
   */
  getOpenMethod(pos: number, subMenu?: number): EEvent | undefined {
    let event: EEvent | undefined = undefined;
    if (subMenu !== undefined) {
      event = this.menu?.items[pos].items?.[subMenu].event ?? EEvent.CLICK;
    }
    if (this.menu?.items[pos].items) {
      event = this.menu?.items[pos].event ?? EEvent.CLICK;
    }
    if (event && this.isMobile) {
      event = EEvent.CLICK;
    }
    return event;
  }

  /**
   * Returns the link fragment
   * @param pos - The position of the menu
   * @returns {string|undefined}
   */
  getMenuFragment(pos: number): string | undefined {
    if (this.menu?.items[pos].fragment) {
      return this.menu?.items[pos].fragment + '#';
    }
    return undefined;
  }

  /**
   * Returns the link fragment for subMenu
   * @param menuItem - The position of the menu
   * @param subMenu - The position of the submenu
   * @returns {string|undefined}
   */
  getSubMenuFragment(
    menuItem: number,
    subMenu: number,
    subsubMenu?: number
  ): string | undefined {
    let fragment: string | undefined = this.getMenuFragment(menuItem);
    if (fragment) {
      if (subsubMenu !== undefined) {
        fragment += this.menu?.items?.[menuItem]?.items?.[subMenu]?.items?.[
          subsubMenu
        ]?.fragment
          ? this.menu?.items?.[menuItem]?.items?.[subMenu]?.items?.[subsubMenu]
              ?.fragment
          : '';
      } else {
        fragment += this.menu?.items?.[menuItem]?.items?.[subMenu]?.fragment
          ? this.menu?.items?.[menuItem]?.items?.[subMenu]?.fragment
          : '';
      }
      return fragment;
    }
    return fragment;
  }

  /**
   * Returns the open state
   * @param pos - The position of the menu
   * @returns {string}
   */
  isSubMenuOpen(pos: number): string {
    return this.menu?.items[pos].opened ? 'show' : '';
  }

  /**
   * Returns the open state
   * @param pos - The position of the menu
   * @returns {string}
   */
  isSubSubMenuOpen(menu: number, subMenu: number): string {
    return this.menu?.items[menu].items?.[subMenu].opened ? 'show' : '';
  }

  menuClicked(
    event: MouseEvent | KeyboardEvent | TouchEvent,
    pos: number,
    subMenu?: number,
    subSubMenu?: number
  ): void {
    if (this.menu.autoReturn === true) {
      this.clicked.emit({
        menu: pos,
        subMenu: subMenu ?? undefined,
        subSubMenu: subSubMenu ?? undefined,
      });
      this.closeAll();
    }

    if (subSubMenu) {
      // Handle sub-sub-menu click event
    } else if (this.getOpenMethod(pos, subMenu) === EEvent.CLICK) {
      if (subMenu !== undefined) {
        if (this.menu.items[pos].items?.[subMenu].opened === true) {
          this.menu.items[pos].items![subMenu].opened = false;
          if (this.menu.items[pos].items![subMenu].button) {
            this.menu.items[pos].items![subMenu].button = {
              ...this.menu.items[pos].items![subMenu].button!,
              iconFirst: {
                ...this.menu.items[pos].items![subMenu].button!.iconFirst!,
                cssContainer: this.menu.items[pos].items![
                  subMenu
                ].button!.iconFirst!.cssContainer!.filter(
                  cssClass => cssClass !== 'active'
                ),
              },
            };
          }
        } else {
          this.menu.items[pos].items![subMenu].opened = true;
          if (this.menu.items[pos].items?.[subMenu].button) {
            this.menu.items[pos].items![subMenu].button = {
              ...this.menu.items[pos].items![subMenu].button!,
              iconFirst: {
                ...this.menu.items[pos].items![subMenu].button!.iconFirst!,
                cssContainer: [
                  ...(this.menu.items[pos].items![subMenu].button!.iconFirst!
                    .cssContainer ?? []),
                  'active',
                ],
              },
            };
          }
        }
        if (event instanceof TouchEvent) {
          event.preventDefault();
        }
      } else {
        if (this.menu.items[pos].opened === true) {
          this.menu.items[pos].opened = false;
          if (this.menu.items[pos].button) {
            this.menu.items[pos].button = {
              ...this.menu.items[pos].button!,
              iconFirst: {
                ...this.menu.items[pos].button!.iconFirst!,
                cssContainer: this.menu.items[
                  pos
                ].button!.iconFirst!.cssContainer!.filter(
                  cssClass => cssClass !== 'active'
                ),
              } as IIcon,
            };
          }
        } else {
          this.menu.items[pos].opened = true;
          if (this.menu.items[pos].button) {
            this.menu.items[pos].button = {
              ...this.menu.items[pos].button!,
              iconFirst: {
                ...this.menu.items[pos].button!.iconFirst!,
                cssContainer: [
                  ...(this.menu.items[pos].button!.iconFirst!.cssContainer ??
                    []),
                  'active',
                ],
              },
            };
          }
        }
        if (event instanceof TouchEvent) {
          event.stopPropagation();
        }
      }
    }
    event.stopPropagation();
  }

  menuHoverEnter(
    _event: MouseEvent | KeyboardEvent,
    pos: number,
    subMenu?: number
  ): void {
    if (this.getOpenMethod(pos, subMenu) === EEvent.HOVER) {
      if (subMenu !== undefined) {
        this.menu.items[pos].items![subMenu].opened = true;
        if (this.menu.items[pos].items![subMenu].button) {
          const button = this.menu.items[pos].items![subMenu].button;
          const iconFirst = button?.iconFirst;
          if (iconFirst) {
            const cssContainer = iconFirst.cssContainer;
            const cssArray = Array.isArray(cssContainer)
              ? cssContainer
              : [cssContainer];

            this.menu.items[pos].items![subMenu].button = {
              ...this.menu.items[pos].items![subMenu].button,
              iconFirst: {
                ...iconFirst,
                cssContainer: [...cssArray, 'active'],
              } as IIcon,
            };
          }
        }
      } else {
        this.menu.items[pos].opened = true;
        if (this.menu.items[pos].button) {
          const button = this.menu.items[pos].button;
          const iconFirst = button?.iconFirst;
          if (iconFirst) {
            const cssContainer = iconFirst.cssContainer;
            const cssArray = Array.isArray(cssContainer)
              ? cssContainer
              : [cssContainer];

            this.menu.items[pos].button = {
              ...this.menu.items[pos].button,
              iconFirst: {
                ...iconFirst,
                cssContainer: [...cssArray, 'active'],
              } as IIcon,
            };
          }
        }
      }
    }
  }

  menuHoverLeave(
    _event: MouseEvent | KeyboardEvent | TouchEvent,
    pos: number,
    subMenu?: number
  ): void {
    if (this.getOpenMethod(pos, subMenu) === EEvent.HOVER) {
      if (subMenu !== undefined) {
        this.menu.items[pos].items![subMenu].opened = false;
        if (this.menu.items[pos].items![subMenu].button) {
          const iconFirst =
            this.menu.items[pos].items![subMenu].button!.iconFirst;
          const cssContainer = iconFirst?.cssContainer;
          if (cssContainer) {
            this.menu.items[pos].items![subMenu].button = {
              ...this.menu.items[pos].items![subMenu].button!,
              iconFirst: {
                ...iconFirst,
                cssContainer: cssContainer.filter(
                  cssClass => cssClass !== 'active'
                ),
              },
            };
          }
        }
      } else {
        this.menu.items[pos].opened = false;
        if (this.menu.items[pos].button) {
          this.menu.items[pos].button = {
            ...this.menu.items[pos].button,
            iconFirst: {
              ...(this.menu.items[pos].button?.iconFirst || {}),
              cssContainer: this.menu.items[
                pos
              ].button?.iconFirst?.cssContainer?.filter(
                cssClass => cssClass !== 'active'
              ),
            } as IIcon,
          };
        }
        this.menu.items[pos].button = {
          ...this.menu.items[pos].button,
          iconFirst: {
            ...(this.menu.items[pos].button?.iconFirst || {}),
            cssContainer: this.menu.items[
              pos
            ].button?.iconFirst?.cssContainer?.filter(
              cssClass => cssClass !== 'active'
            ),
          } as IIcon,
        };
      }
    }
  }

  mobileEnter(event: MouseEvent | TouchEvent, pos: number, subMenu?: number) {
    this.menuClicked(event, pos, subMenu);
    event.stopPropagation();
  }

  mobileLeave(event: MouseEvent | TouchEvent, _pos: number, _subMenu?: number) {
    event.stopPropagation();
  }

  /**
   * Closes all submenus
   */
  closeAll(): void {
    this.menu.items = this.menu.items.map(subMenu => ({
      ...subMenu,
      opened: false,
      button: {
        ...subMenu.button,
        iconFirst: {
          ...(subMenu.button?.iconFirst || {}),
          cssContainer: subMenu.button?.iconFirst?.cssContainer?.filter(
            cssClass => cssClass !== 'active'
          ),
        } as IIcon,
      },
      items: (subMenu.items || []).map(subMenuItem => ({
        ...subMenuItem,
        opened: false,
        button: {
          ...subMenuItem.button,
          iconFirst: {
            ...(subMenuItem.button?.iconFirst || {}),
            cssContainer: subMenuItem.button?.iconFirst?.cssContainer?.filter(
              cssClass => cssClass !== 'active'
            ),
          } as IIcon,
        },
      })),
    }));
  }
}
