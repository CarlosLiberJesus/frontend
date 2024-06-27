import { TemplateRef } from '@angular/core';

export interface ICarousel {
  title?: string;
  css?: string[];
  cssTitle?: string[];
  cssIcons?: string[];
  cssPane?: string[];
  timer?: number;
  indicators?: boolean;
  tab: ICarouselTab[];
}

export interface ICarouselTab {
  css?: string[];
  cssLink?: string[];
  content?: TemplateRef<HTMLElement>;
  caption?: {
    title?: string;
    cssTitle?: string[];
    message?: string;
    cssMessage?: string[];
  };
}
