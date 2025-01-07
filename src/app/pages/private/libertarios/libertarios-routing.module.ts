import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibertariosComponent } from './libertarios.component';
import { LibertarioComponent } from './libertario/libertario.component';
import { LibertarioGuard } from 'src/app/lib/route-guards/libertario.guard';
import { MeOrAdminsGuard } from 'src/app/lib/route-guards/meOrAdmins.guard';
import { ComelGuard } from 'src/app/lib/route-guards/comel.guard';
import { PerfisComponent } from './perfis/perfis.component';

const libertariosRoutes: Routes = [
  { path: '', component: LibertariosComponent, canActivate: [LibertarioGuard] },
  {
    path: 'perfis',
    component: PerfisComponent,
    canActivate: [ComelGuard],
  },
  {
    path: ':id',
    component: LibertarioComponent,
    canActivate: [MeOrAdminsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(libertariosRoutes)],
  exports: [RouterModule],
})
export class LibertariosRoutingModule {}
