import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentacaoComponent } from './documentacao.component';
import { DocumentoComponent } from './documento/documento.component';

const documentacaoRoutes: Routes = [
  { path: '', component: DocumentacaoComponent },
  { path: ':id', component: DocumentoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(documentacaoRoutes)],
  exports: [RouterModule],
})
export class DocumentacaoRoutingModule {}
