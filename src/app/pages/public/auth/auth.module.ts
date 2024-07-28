import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistoComponent } from './registo/registo.component';
import { LoginComponent } from './login/login.component';
import { LostPassComponent } from './lost-pass/lost-pass.component';
import { LibertarioComponent } from './libertario/libertario.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegistoComponent,
    LoginComponent,
    LostPassComponent,
    LibertarioComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ElementsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
