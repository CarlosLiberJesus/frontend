import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibertariosRoutingModule } from './libertarios-routing.module';
import { LibertariosComponent } from './libertarios.component';
import { LibertarioComponent } from './libertario/libertario.component';

@NgModule({
  declarations: [LibertariosComponent, LibertarioComponent],
  imports: [CommonModule, LibertariosRoutingModule],
})
export class LibertariosModule {}
