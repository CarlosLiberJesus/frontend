import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from './forms/form.module';
import { BaseModule } from './base/base.module';
import { HtmlModule } from './html/html.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BaseModule, FormModule, NavigationModule, HtmlModule],
  exports: [BaseModule, FormModule, NavigationModule, HtmlModule],
})
export class ElementsModule {}
