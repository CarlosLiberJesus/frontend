import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IPagination } from './pagination';
import { IIcon } from '../../base/icon/icon';

@Component({
  selector: 'app-bootstrap-html-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pagination!: IPagination | undefined;
  @Output() paginationChanged = new EventEmitter<number>();

  randomId: string = this.trimTrailingZeros(Math.random().toString());
  trimTrailingZeros(num: string): string {
    return parseFloat(num).toFixed(8).replace('.', '').replace(/^0+/, '');
  }

  defaultFirstIcon: IIcon = {
    library: 'bi',
    value: 'bi-chevron-double-left',
    css: ['fs-2', 'p-0'],
  };
  defaultPrevIcon: IIcon = {
    library: 'bi',
    value: 'bi-chevron-left',
    css: ['fs-2', 'p-0'],
  };
  defaultNextIcon: IIcon = {
    library: 'bi',
    value: 'bi-chevron-right',
    css: ['fs-2', 'p-0'],
  };
  defaultLasttIcon: IIcon = {
    library: 'bi',
    value: 'bi-chevron-double-right',
    css: ['fs-2', 'p-0'],
  };

  //range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
  range = (start: number, end: number) => {
    const maxPages = this.pagination?.maxPages;
    if (!maxPages) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    } else {
      if (end - start <= maxPages) {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      } else {
        const currentPage = this.pagination?.page ?? 1; // You'll need to implement this function
        const halfMaxPages = Math.floor(maxPages / 2);
        if (currentPage <= halfMaxPages) {
          return Array.from({ length: maxPages }, (_, i) => start + i);
        } else if (currentPage >= end - halfMaxPages) {
          return Array.from(
            { length: maxPages },
            (_, i) => end - maxPages + i + 1
          );
        } else {
          return Array.from(
            { length: maxPages },
            (_, i) => currentPage - halfMaxPages + i
          );
        }
      }
    }
  };

  /**
   * Returns the css classes for the pagination
   * @returns {string}
   */
  getPaginationClass(): string {
    return [
      ...(this.pagination?.css ?? []),
      'pagination',
      'pagination_' + this.randomId,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the page item
   * @returns {string}
   */
  getPageItemClass(pos: number, css?: string): string {
    return [
      ...(this.pagination?.cssItem ?? []),
      'page-item',
      css ?? '',
      this.isDisabled(pos) ? 'disabled' : '',
      pos === this.pagination?.page ? ' active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns the css classes for the page link
   * @returns {string}
   */
  getPageLinkClass(pos?: string): string {
    return [
      ...(this.pagination?.cssLink ?? []),
      'page-link',
      this.validateIfText(pos) ? 'page-text' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns true if the text is set
   * @param {string} pos - for the first, previous, next and last
   * @returns {boolean}
   */
  validateIfText(pos?: string): boolean {
    switch (pos) {
      case 'first':
        return !!this.pagination?.text?.first;
      case 'previous':
        return !!this.pagination?.text?.previous;
      case 'next':
        return !!this.pagination?.text?.next;
      case 'last':
        return !!this.pagination?.text?.last;
    }
    return false;
  }

  /**
   * Returns true if the page is disabled
   * @param {number} pos - The position of the page
   * @returns {boolean}
   */
  isDisabled(pos: number): boolean {
    if (
      (pos === 0 && this.pagination?.page === 1) ||
      (pos > this.getNumberOfPages() &&
        this.pagination?.page === this.getNumberOfPages())
    ) {
      return true;
    }
    return false;
  }

  /**
   * Returns the number of pages
   * @returns {number}
   */
  getNumberOfPages(): number {
    if (this.pagination?.total) {
      return Math.ceil(this.pagination?.total / this.pagination?.perPage);
    } else {
      return 1;
    }
  }

  /**
   * Returns the icons
   * @param {string} pos - for the first, previous, next and last
   * @returns {IIcon}
   */
  getIcons(pos: string): IIcon {
    let icon!: IIcon;
    switch (pos) {
      case 'first':
        icon = this.pagination?.icons?.first ?? this.defaultFirstIcon;
        break;
      case 'previous':
        icon = this.pagination?.icons?.previous ?? this.defaultPrevIcon;
        break;
      case 'next':
        icon = this.pagination?.icons?.next ?? this.defaultNextIcon;
        break;
      case 'last':
        icon = this.pagination?.icons?.last ?? this.defaultLasttIcon;
        break;
      default:
        break;
    }
    return icon;
  }

  /**
   * Handles the change event when page-item clicked
   * @param _$event - The mouse event
   * @param pos - The position of the page
   * @param change - The change
   */
  changePage(
    _$event: MouseEvent | KeyboardEvent,
    pos: number,
    change?: string
  ): void {
    if (pos === 0 && change) {
      switch (change) {
        case 'first':
          pos = 1;
          break;
        case 'last':
          pos = this.getNumberOfPages();
          break;
        case 'previous':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          pos = this.pagination!.page - 1;
          break;
        case 'next':
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          pos = this.pagination!.page + 1;
          break;
        default:
          break;
      }
    }
    if (pos === this.pagination?.page) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.pagination!.page = pos;
    this.paginationChanged.emit(pos);
  }
}
