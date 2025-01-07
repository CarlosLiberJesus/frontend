import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITabs, ITab } from './tabs';

@Component({
  selector: 'app-bootstrap-navigation-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() tabs!: ITabs;
  @Output() tabChanged = new EventEmitter<number>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Changes the active tab
   * @param {MouseEvent | KeyboardEvent} _$event - The click event
   * @param {number} pane - The position of the tab
   */
  changeTabPane(_$event: MouseEvent | KeyboardEvent, pane: number): void {
    if (this.tabs !== null) {
      if (this.tabs.tab[pane].cssLink?.includes('disabled')) {
        return;
      }
      this.tabs.tab.forEach((tab: ITab) => {
        tab.cssLink = tab.cssLink?.filter(
          className => !className.includes('active')
        );
      });
      this.tabs.tab[pane].cssLink = [
        ...(this.tabs.tab[pane].cssLink ?? []),
        'active',
      ];
    }
    this.tabChanged.emit(pane);
  }

  /**
   * Returns the css classes for the container
   * @returns {string}
   */
  getTabClass(): string {
    return [...(this.tabs.cssUl ?? []), 'nav', 'nav-tabs']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the tab
   * @returns {string}
   */
  getTabItemClass(pos: number): string {
    return [...(this.tabs.tab[pos].css ?? []), 'nav-item']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for link that opens the tab
   * @returns {string}
   */
  getTabItemLinkClass(pos: number): string {
    return [...(this.tabs.tab[pos].cssLink ?? []), 'nav-link']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes to set position of links Top|Left
   * TODO Tabs on the right
   * @returns {string}
   */
  getExtraHorizontal(): string {
    const flex = this.tabs?.cssUl?.findIndex(
      (cssClass: string) => cssClass === 'flex-column'
    );
    let css: string = 'tabs tabs_' + this.randomId;
    css += flex !== -1 ? ' d-flex' : '';
    return css;
  }

  /**
   * Returns the css classes for the active pane
   * @param {number} tab - The position of the tab
   * @returns {string}
   */
  getActivePaneClass(tab: number): string {
    if (this.tabs.tab[tab].cssLink?.includes('active') === true) {
      return [...(this.tabs.tab[tab].cssPane ?? []), 'show', 'active']
        .filter(Boolean)
        .join(' ');
    }
    return '';
  }

  getTabItemTitleClass(pos: number): string {
    return [...(this.tabs.tab[pos].cssLabel ?? []), 'nav-text']
      .filter(Boolean)
      .join(' ');
  }

  getTabItemBulletClass(pos: number): string {
    return [...(this.tabs.tab[pos].bullet ?? [])].filter(Boolean).join(' ');
  }
}
