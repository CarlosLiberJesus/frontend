import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ESort, ITable } from './table';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IPagination } from '../pagination/pagination';
import { ISelect } from '../../forms/select/select';
import { IButton } from '../button/button';

@Component({
  selector: 'app-bootstrap-html-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() table!: ITable;
  @Output() pageChanged = new EventEmitter<IPagination>();

  formGroup: FormGroup = new FormGroup({
    seletected: new FormArray([]),
    perPage: new FormControl('10'),
    page: new FormControl(1),
  });

  pageSelect: ISelect = {
    name: 'table-page-select',
    css: ['borderless', 'icon-check'],
    option: [
      {
        text: '5',
        css: ['text-dark'],
        value: '5',
      },
      {
        text: '10',
        css: ['text-dark'],
        value: '10',
      },
      {
        text: '25',
        css: ['text-dark'],
        value: '25',
      },
    ],
    iconChecked: {
      library: 'fa-regular',
      value: 'fa-circle-check',
      css: ['fs-2'],
    },
    cssOption: ['border-top-0', 'border-bottom-0'],
  };

  // one for each position inited in table.header.columns[]
  sortIcons: IButton[] = [];

  cardIcon: IButton = {
    css: [
      'btn-sm',
      'btn-icon',
      'btn-light',
      'btn-color-muted',
      'btn-active-primary',
      'me-3',
      this.table?.css?.includes('table-card') ? 'active' : '',
    ],
    iconFirst: {
      library: 'fa-regular',
      value: 'fa-square-full',
      css: ['fs-3'],
    },
  };
  rowIcon: IButton = {
    css: [
      'btn-sm',
      'btn-icon',
      'btn-light',
      'btn-color-muted',
      'btn-active-primary',
      'me-3',
      this.table?.css?.includes('table-row') ? 'active' : '',
    ],
    iconFirst: {
      library: 'bi',
      value: 'bi-justify',
      css: ['fs-3'],
    },
  };

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }

  getCardClass(): string {
    // first class to be hit ensure there is a table-row
    if (
      this.table.css?.includes('table-switch') &&
      !this.table.css?.includes('table-row') &&
      !this.table.css?.includes('table-card')
    ) {
      this.table.css.push('table-row');
      this.rowIcon.css?.push('active');
    } else if (
      !this.table.css?.includes('table-switch') &&
      !this.table.css?.includes('table-row')
    ) {
      this.table.css?.push('table-row');
    }
    return [
      ...(this.table?.card?.css ?? []),
      this.table?.css?.includes('table-card') ? 'bg-transparent' : '',
      'card',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getCardHeaderClass(): string {
    return [...(this.table?.card?.header?.css ?? []), 'card-header']
      .filter(Boolean)
      .join(' ');
  }

  getTitleClass(): string {
    return [...(this.table?.card?.header?.titleCss ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  getSmallTitleClass(): string {
    return [...(this.table?.card?.header?.smallCss ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  getToolbarClass(): string {
    return [
      ...(this.table?.card?.header?.toolbar ?? []),
      'd-flex',
      'align-items-center',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getBodyClass(): string {
    return [...(this.table?.card?.body ?? []), 'card-body']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Get css of the table
   *
   * @returns {string}
   */
  getTableClass(): string {
    return [...(this.table.css ?? []), 'table'].filter(Boolean).join(' ');
  }

  /**
   * Get css of the table header row
   *
   * @returns {string}
   */
  getHearderClass(): string {
    return [...(this.table.tableHeaders?.css ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Get css of the table header column
   *
   * @param {number} pos Header Column position
   * @returns {string}
   */
  getHearderColumnClass(pos: number): string {
    return [...(this.table.tableHeaders?.columns[pos]?.css ?? [])]
      .filter(Boolean)
      .join(' ');
  }

  getTbodyClass(): string {
    return [...(this.table?.cssBody ?? [])].filter(Boolean).join(' ');
  }

  /**
   * Get the sort button provides a default icon if not provided
   *
   * @param {number} pos Header Column position
   * @returns {IButton}
   */
  getSortButton(pos: number): IButton {
    if (!this.sortIcons[pos]) {
      const sortIcon: IButton = {
        css: ['px-2 p-0', 'rotate'],
        iconFirst: {
          library: 'bi',
          value: 'bi-chevron-down',
          css: ['rotate-180', this.inheritLettering()],
          cssContainer: ['rotate'],
        },
      };
      if (this.table.tableHeaders?.columns[pos]?.sort) {
        if (this.table.tableHeaders?.columns[pos]?.sort === ESort.ASC) {
          sortIcon.css?.push('active');
        }
        if (pos === 0) {
          this.sortArrayByProperty(
            0,
            this.table.tableHeaders?.columns[pos]?.sort
          );
        }
      }
      this.sortIcons.push(sortIcon);
    }
    return this.sortIcons[pos];
  }

  /**
   * Tries to pick classes from table headers, to give similarity to icon
   *
   * @returns {string} css related classes for lettering
   */
  inheritLettering(): string {
    const filteredClasses =
      this.table?.tableHeaders?.css?.filter(cssClass => {
        return (
          cssClass.startsWith('f') ||
          cssClass.startsWith('text-') ||
          cssClass.startsWith('bg-')
        );
      }) ?? [];
    return filteredClasses.join(' ');
  }

  /**
   * Will trigger a sort on the content of the table, based on the position and direction pretended
   *
   * @param {number} pos - description of parameter
   */
  onSortChange(pos: number): void {
    if (this.table.tableHeaders?.columns[pos]?.sort === ESort.ASC) {
      this.table.tableHeaders.columns[pos].sort = ESort.DESC;
      this.sortArrayByProperty(pos, ESort.DESC);
    } else {
      this.table.tableHeaders.columns[pos].sort = ESort.ASC;
      this.sortArrayByProperty(pos, ESort.ASC);
    }
  }

  /**
   * Main sorting function. It will sort the content of the table
   *
   * @param {number} positionIndex column to sort
   * @param {ESort} direction 'asc' or 'desc'
   */
  sortArrayByProperty(
    positionIndex: number,
    direction: ESort.ASC | ESort.DESC | undefined
  ): void {
    this.table?.tableData?.sort((a, b) => {
      const valueA = Object.values(a)[positionIndex] as string | number;
      const valueB = Object.values(b)[positionIndex] as string | number;
      if (direction === ESort.ASC) {
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      } else {
        // direction === 'desc'
        if (valueA > valueB) {
          return -1;
        }
        if (valueA < valueB) {
          return 1;
        }
        return 0;
      }
    });
  }

  onTableStyleSwitch(_$event: MouseEvent | KeyboardEvent, value: string): void {
    const css: string[] =
      this.table?.css?.filter(
        element => !['table-row', 'table-card'].includes(element)
      ) ?? [];
    css.push(value);
    if (value === 'table-card') {
      this.rowIcon = {
        ...this.rowIcon,
        css:
          this.rowIcon.css?.filter(element => !['active'].includes(element)) ??
          [],
      };
      this.cardIcon.css?.push('active');
    } else {
      this.cardIcon = {
        ...this.cardIcon,
        css:
          this.cardIcon.css?.filter(element => !['active'].includes(element)) ??
          [],
      };
      this.rowIcon.css?.push('active');
    }
    this.table = { ...this.table, css: css };
  }

  onPaginationChange(page: number): void {
    this.formGroup.get('page')?.setValue(page);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.table.pagination!.page = page;
    this.pageChanged.emit(this.table.pagination);
  }

  onPerPageChange() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.table.pagination!.perPage = this.formGroup.get('perPage')?.value;
    this.pageChanged.emit(this.table.pagination);
  }
}
