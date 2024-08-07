import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './biblioteca.component';

const bibliotecaRoutes: Routes = [{ path: '', component: BibliotecaComponent }];

@NgModule({
  imports: [RouterModule.forChild(bibliotecaRoutes)],
  exports: [RouterModule],
})
export class BibliotecaRoutingModule {}
