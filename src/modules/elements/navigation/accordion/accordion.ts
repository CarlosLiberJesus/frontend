import { TemplateRef } from '@angular/core';
import { IIcon } from '../../base/icon/icon';

export interface IAccordion {
  tab: IAccordionTab[];
  css?: string[];
  cssPane?: string[];
  icon?: IIcon;
  iconAux?: IIcon;
}

export interface IAccordionTab {
  title: string;
  content?: TemplateRef<HTMLElement>;
  css?: string[];
  cssLink?: string[];
  cssHeader?: string[];
}
