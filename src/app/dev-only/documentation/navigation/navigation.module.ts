import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationModule } from 'src/modules/elements/navigation/navigation.module';
import { BaseModule } from 'src/modules/elements/base/base.module';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { CodeHighlightModule } from '../code-highlight/code-highlight.module';
import { DocumentationAccordionComponent } from './accordion/accordion.component';
import { AccordionModel } from './accordion/accordion.model';
import { DocumentationBreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbsModel } from './breadcrumbs/breadcrumbs.model';
import { DocumentationCarouselComponent } from './carousel/carousel.component';
import { CarouselModel } from './carousel/carousel.model';
import { DocumentationMenuComponent } from './menu/menu.component';
import { MenuModel } from './menu/menu.model';
import { DocumentationTabsComponent } from './tabs/tabs.component';
import { TabsModel } from './tabs/tabs.model';

@NgModule({
  declarations: [
    NavigationComponent,
    DocumentationAccordionComponent,
    DocumentationBreadcrumbsComponent,
    DocumentationCarouselComponent,
    DocumentationMenuComponent,
    DocumentationTabsComponent,
  ],
  imports: [
    CommonModule,
    FormModule,
    NavigationModule,
    BaseModule,
    CodeHighlightModule,
  ],
  providers: [
    AccordionModel,
    BreadcrumbsModel,
    CarouselModel,
    MenuModel,
    TabsModel,
  ],
  exports: [NavigationComponent],
})
export class DocumentationNavigationModule {}
