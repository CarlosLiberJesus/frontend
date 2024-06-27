import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { PopOverComponent } from './pop-over/pop-over.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [IconComponent, PopOverComponent, AvatarComponent],
  imports: [CommonModule],
  exports: [IconComponent, PopOverComponent, AvatarComponent],
})
export class BaseModule {}
