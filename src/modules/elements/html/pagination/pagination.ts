import { IIcon } from '../../base/icon/icon';

export interface IPagination {
  page: number;
  perPage: number;
  total: number;
  css?: string[];
  cssItem?: string[];
  cssLink?: string[];
  maxPages?: number;
  icons?: {
    first?: IIcon;
    previous?: IIcon;
    next?: IIcon;
    last?: IIcon;
  };
  text?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}
