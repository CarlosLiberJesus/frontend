import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { BaseModule } from '../base/base.module';
import { HtmlModule } from '../html/html.module';
import { HorizontalAccordionComponent } from './horizontal-accordion/horizontal-accordion.component';

@NgModule({
  declarations: [
    TabsComponent,
    MenuComponent,
    BreadcrumbsComponent,
    AccordionComponent,
    CarouselComponent,
    HorizontalAccordionComponent,
  ],
  imports: [CommonModule, BaseModule, HtmlModule, RouterModule],
  exports: [
    TabsComponent,
    MenuComponent,
    BreadcrumbsComponent,
    AccordionComponent,
    CarouselComponent,
    HorizontalAccordionComponent,
  ],
})
export class NavigationModule {}
