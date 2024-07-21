import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario.component';
import { EventoComponent } from './evento/evento.component';

const calendarioRoutes: Routes = [
  { path: '', component: CalendarioComponent },
  { path: ':id', component: EventoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(calendarioRoutes)],
  exports: [RouterModule],
})
export class CalendarioRoutingModule {}
