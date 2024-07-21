import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';
import { EventoComponent } from './evento/evento.component';

@NgModule({
  declarations: [CalendarioComponent, EventoComponent],
  imports: [CommonModule, CalendarioRoutingModule],
})
export class CalendarioModule {}
