import { TemplateRef } from '@angular/core';
import { IIcon } from '../../base/icon/icon';
import { ISpinner } from '../../html/spinner/spinner';

export interface ITabs {
  tab: ITab[];
  cssUl?: string[];
}

export interface ITab {
  title: string;
  slug?: string;
  content?: TemplateRef<HTMLElement>;
  css?: string[];
  cssLink?: string[];
  cssLabel?: string[];
  iconFirst?: IIcon;
  iconLast?: IIcon;
  bullet?: string[];
  loading?: ISpinner;
  cssPane?: string[];
}
