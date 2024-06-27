import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import { DocumentationNavigationModule } from './navigation/navigation.module';
import { DocumentationIntroModule } from './intro/intro.module';
import { DocumentationFormsModule } from './forms/forms.module';
import { DocumentationHtmlModule } from './html/html.module';
import { ElementsModule } from 'src/modules/elements/elements.module';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationIntroModule,
    DocumentationFormsModule,
    DocumentationHtmlModule,
    DocumentationNavigationModule,
    ElementsModule,
  ],
  exports: [DocumentationComponent],
})
export class DocumentationModule {}
