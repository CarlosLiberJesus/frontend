import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  IHorizontalAccordion,
  IHorizontalAccordionTab,
} from './horizontal-accordion';

@Component({
  selector: 'app-bootstrap-navigation-horizontal-accordion',
  templateUrl: './horizontal-accordion.component.html',
  styleUrls: ['./horizontal-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalAccordionComponent {
  @Input() horizontalAccordion!: IHorizontalAccordion;
  @Output() tabChanged = new EventEmitter<number>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  /**
   * Returns the css classes for the accordion
   * @returns {string}
   */
  getHorizontalAccordionClass(): string {
    return [
      'horizontal-accordion',
      ...(this.horizontalAccordion?.css ?? []),
      'horizontal-accordion_' + this.randomId,
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
    return (
      this.horizontalAccordion?.tab[pane].cssLink?.includes('active') ?? false
    );
  }

  /**
   * Changes the active tab
   * @param {MouseEvent | KeyboardEvent} _$event - The click event
   * @param {number} pane - The position of the tab
   */
  changeTabPane(_$event: MouseEvent | KeyboardEvent, pane: number): void {
    if (this.horizontalAccordion !== null) {
      if (this.horizontalAccordion.tab[pane].cssLink?.includes('disabled')) {
        return;
      }
      this.horizontalAccordion.tab.forEach((tab: IHorizontalAccordionTab) => {
        tab.cssLink = tab.cssLink?.filter(
          className => !className.includes('active')
        );
      });
      this.horizontalAccordion.tab[pane].cssLink = [
        ...(this.horizontalAccordion.tab[pane].cssLink ?? []),
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
      ...(this.horizontalAccordion.tab[pos].cssHeader ?? []),
      'horizontal-accordion-header',
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
  getHorizontalAccordionItemClass(pos: number): string {
    return [
      'horizontal-accordion-item',
      ...(this.horizontalAccordion?.tab[pos].css ?? []),
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the accordion link
   * @param {pos} - The position of the tab
   * @param {active} - Extra class if active
   * @returns
   */
  getHorizontalAccordionLinkClass(pos: number, extra?: string): string {
    return [
      ...(this.horizontalAccordion.tab[pos].cssLink ?? []),
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
    return [
      ...(this.horizontalAccordion.cssPane ?? []),
      this.isActive(pos) ? 'show' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
