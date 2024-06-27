import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlComponent } from './html.component';
import { DocumentationAlertsComponent } from './alert/alert.component';
import { DocumentationBadgeComponent } from './badge/badge.component';
import { DocumentationBulletsComponent } from './bullets/bullets.component';
import { DocumentationButtonComponent } from './button/button.component';
import { DocumentationPaginationComponent } from './pagination/pagination.component';
import { DocumentationSeparatorComponent } from './separator/separator.component';
import { DocumentationSpinnerComponent } from './spinner/spinner.component';
import { DocumentationTableComponent } from './table/table.component';
import { AlertsModel } from './alert/alerts.model';
import { CodeHighlightModule } from '../code-highlight/code-highlight.module';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { HtmlModule } from 'src/modules/elements/html/html.module';
import { BadgeModel } from './badge/badge.model';
import { BulletsModel } from './bullets/bullets.model';
import { ButtonModel } from './button/button.model';
import { PaginationModel } from './pagination/pagination.model';
import { SeparatorModel } from './separator/separator.model';
import { SpinnerModel } from './spinner/spinner.model';
import { TableModel } from './table/table.model';
import { DocumentationAvatarComponent } from './avatar/avatar.component';
import { AvatarModel } from './avatar/avatar.model';
import { BaseModule } from 'src/modules/elements/base/base.module';
import { DocumentationCardComponent } from './card/card.component';
import { CardModel } from './card/card.model';
import { DocumentationHoverMessageComponent } from './hover-message/hover-message.component';
import { HoverMessageModel } from './hover-message/hover-message.model';

@NgModule({
  declarations: [
    HtmlComponent,
    DocumentationAlertsComponent,
    DocumentationBadgeComponent,
    DocumentationBulletsComponent,
    DocumentationButtonComponent,
    DocumentationPaginationComponent,
    DocumentationSeparatorComponent,
    DocumentationSpinnerComponent,
    DocumentationTableComponent,
    DocumentationAvatarComponent,
    DocumentationCardComponent,
    DocumentationHoverMessageComponent,
  ],
  imports: [
    CommonModule,
    FormModule,
    HtmlModule,
    BaseModule,
    CodeHighlightModule,
  ],
  providers: [
    AlertsModel,
    BadgeModel,
    BulletsModel,
    ButtonModel,
    PaginationModel,
    SeparatorModel,
    SpinnerModel,
    TableModel,
    AvatarModel,
    CardModel,
    HoverMessageModel,
  ],
  exports: [HtmlComponent],
})
export class DocumentationHtmlModule {}
