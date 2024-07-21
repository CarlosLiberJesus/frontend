import { TemplateRef } from '@angular/core';

export interface IHorizontalAccordion {
  tab: IHorizontalAccordionTab[];
  css?: string[];
  cssPane?: string[];
}

export interface IHorizontalAccordionTab {
  title: string;
  content?: TemplateRef<HTMLElement>;
  css?: string[];
  cssLink?: string[];
  cssHeader?: string[];
}
