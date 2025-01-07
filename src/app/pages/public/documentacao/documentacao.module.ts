import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacaoRoutingModule } from './documentacao-routing.module';
import { DocumentacaoComponent } from './documentacao.component';
import { DocumentoComponent } from './documento/documento.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { CodeHighlightModule } from '../../../dev-only/documentation/code-highlight/code-highlight.module';

@NgModule({
  declarations: [DocumentacaoComponent, DocumentoComponent],
  imports: [
    CommonModule,
    DocumentacaoRoutingModule,
    ElementsModule,
    CodeHighlightModule,
  ],
})
export class DocumentacaoModule {}
