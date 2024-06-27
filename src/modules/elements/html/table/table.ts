import { TemplateRef } from '@angular/core';
import { IPagination } from '../pagination/pagination';
import { IIcon } from '../../base/icon/icon';
import { ISpinner } from '../spinner/spinner';

export enum ESort {
  ASC = 'asc',
  DESC = 'desc',
}

export interface ITable {
  card?: {
    css?: string[];
    header?: {
      css?: string[];
      titleCss?: string[];
      smallCss?: string[];
      toolbar?: string[];
    };
    body?: string[];
  };
  css?: string[];
  title?: string;
  smallTitle?: string;
  notFound?: string;
  loading?: ISpinner;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolbar: TemplateRef<any> | null;
  tableHeaders: {
    css?: string[];
    columns: ITableColumn[];
  };
  cssBody?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData?: any[] | null;
  pagination?: IPagination;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowTemplate: TemplateRef<any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardTemplate: TemplateRef<any> | null;
}

export interface ITableColumn {
  name: string;
  css?: string[];
  sort?: ESort;
  icon?: IIcon; // TODO icon (activate tooltip)
}
