import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistoComponent } from './registo/registo.component';
import { LoginComponent } from './login/login.component';
import { LostPassComponent } from './lost-pass/lost-pass.component';
import { LibertarioComponent } from './libertario/libertario.component';

const authRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'recuperar', component: LostPassComponent },
  { path: ':id', component: LibertarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
