import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibertarioGuard } from 'src/app/lib/route-guards/libertario.guard';
import { TarefasComponent } from './tarefas/tarefas.component';

const tarefasRoutes: Routes = [
  { path: '', component: TarefasComponent, canActivate: [LibertarioGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(tarefasRoutes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}
