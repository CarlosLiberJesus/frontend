import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibertariosComponent } from './libertarios.component';
import { LibertarioComponent } from './libertario/libertario.component';
import { LibertarioGuard } from 'src/app/lib/route-guards/libertario.guard';
import { MeOrAdminsGuard } from 'src/app/lib/route-guards/meOrAdmins.guard';

const libertariosRoutes: Routes = [
  { path: '', component: LibertariosComponent, canActivate: [LibertarioGuard] },
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
