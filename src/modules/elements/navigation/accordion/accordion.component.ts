import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IAccordion, IAccordionTab } from './accordion';

@Component({
  selector: 'app-bootstrap-navigation-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @Input() accordion!: IAccordion;
  @Output() tabChanged = new EventEmitter<number>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the accordion
   * @returns {string}
   */
  getAccordionClass(): string {
    return [
      'accordion',
      ...(this.accordion?.css ?? []),
      'accordion_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns if the tab is active
   * @param {number} pane - The position of the tab
   * @returns {boolean}
   */
  isActive(pane: number): boolean {
    return this.accordion?.tab[pane].cssLink?.includes('active') ?? false;
  }

  /**
   * Changes the active tab
   * @param {MouseEvent | KeyboardEvent} _$event - The click event
   * @param {number} pane - The position of the tab
   */
  changeTabPane(_$event: MouseEvent | KeyboardEvent, pane: number): void {
    if (this.accordion !== null) {
      if (this.accordion.tab[pane].cssLink?.includes('disabled')) {
        return;
      }
      this.accordion.tab.forEach((tab: IAccordionTab) => {
        tab.cssLink = tab.cssLink?.filter(
          className => !className.includes('active')
        );
      });
      this.accordion.tab[pane].cssLink = [
        ...(this.accordion.tab[pane].cssLink ?? []),
        'active',
      ];
    }
    this.tabChanged.emit(pane);
  }

  /**
   * Returns the css classes for the accordion Element Header
   * @param {pos} - The position of the tab
   * @param {active} - Extra class if active
   * @returns
   */
  getHeaderClass(pos: number, active?: boolean): string {
    return [
      ...(this.accordion.tab[pos].cssHeader ?? []),
      'accordion-header',
      active === false ? 'collapsed' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   *Returns the css classes for the accordion element
   * @param {pos} - The position of the tab
   * @returns
   */
  getAccordionItemClass(pos: number): string {
    return ['accordion-item', ...(this.accordion?.tab[pos].css ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the accordion link
   * @param {pos} - The position of the tab
   * @param {active} - Extra class if active
   * @returns
   */
  getAccordionLinkClass(pos: number, extra?: string): string {
    return [
      ...(this.accordion.tab[pos].cssLink ?? []),
      this.isActive(pos) ? '' : 'collapsed',
      extra ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the pane
   * @param {pos} - The position of the tab
   * @returns
   */
  getPaneClass(pos: number): string {
    return [...(this.accordion.cssPane ?? []), this.isActive(pos) ? 'show' : '']
      .filter(Boolean)
      .join(' ');
  }
}
