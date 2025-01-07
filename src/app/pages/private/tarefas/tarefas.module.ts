import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefasComponent } from './tarefas/tarefas.component';
import { TarefasRoutingModule } from './tarefas-routing.modules';
import { ElementsModule } from 'src/modules/elements/elements.module';

@NgModule({
  declarations: [TarefasComponent],
  imports: [CommonModule, TarefasRoutingModule, ElementsModule],
  exports: [TarefasComponent],
})
export class TarefasModule {}
