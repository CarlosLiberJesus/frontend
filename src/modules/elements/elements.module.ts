import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from './forms/form.module';
import { BaseModule } from './base/base.module';
import { HtmlModule } from './html/html.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormModule, BaseModule, HtmlModule, NavigationModule],
  exports: [FormModule, BaseModule, HtmlModule, NavigationModule],
})
export class ElementsModule {}
