import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BaseModule } from '../base/base.module';
import { AlertComponent } from './alert/alert.component';
import { BulletsComponent } from './bullets/bullets.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SeparatorComponent } from './separator/separator.component';
import { TableComponent } from './table/table.component';
import { FormModule } from '../forms/form.module';

@NgModule({
  declarations: [
    BadgeComponent,
    ButtonComponent,
    SpinnerComponent,
    AlertComponent,
    BulletsComponent,
    PaginationComponent,
    SeparatorComponent,
    TableComponent,
  ],
  imports: [CommonModule, BaseModule, FormModule],
  exports: [
    BadgeComponent,
    ButtonComponent,
    SpinnerComponent,
    AlertComponent,
    BulletsComponent,
    PaginationComponent,
    SeparatorComponent,
    TableComponent,
  ],
})
export class HtmlModule {}
