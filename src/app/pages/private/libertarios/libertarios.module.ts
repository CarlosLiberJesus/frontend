import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibertariosRoutingModule } from './libertarios-routing.module';
import { LibertariosComponent } from './libertarios.component';
import { LibertarioComponent } from './libertario/libertario.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { PrivateLibertarioDetalheComponent } from './libertario/private-libertario-detalhe/private-libertario-detalhe.component';
import { PrivateLibertarioEditComponent } from './libertario/private-libertario-edit/private-libertario-edit.component';

@NgModule({
  declarations: [
    LibertariosComponent,
    LibertarioComponent,
    PrivateLibertarioDetalheComponent,
    PrivateLibertarioEditComponent,
  ],
  imports: [CommonModule, LibertariosRoutingModule, ElementsModule],
})
export class LibertariosModule {}
