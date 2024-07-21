import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibertariosComponent } from './libertarios.component';
import { LibertarioComponent } from './libertario/libertario.component';

const libertariosRoutes: Routes = [
  { path: '', component: LibertariosComponent },
  { path: ':id', component: LibertarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(libertariosRoutes)],
  exports: [RouterModule],
})
export class LibertariosRoutingModule {}
