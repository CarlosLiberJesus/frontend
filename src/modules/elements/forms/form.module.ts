import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseModule } from '../base/base.module';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { ToggleComponent } from './toggle/toggle.component';
import { SelectComponent } from './select/select.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { RadioComponent } from './radio/radio.component';
import { TextareaComponent } from './textarea/textarea.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { InputGroupComponent } from './input-group/input-group.component';
import { ButtonGroupComponent } from './button-group/button-group.component';

@NgModule({
  declarations: [
    InputComponent,
    RangeSliderComponent,
    ToggleComponent,
    SelectComponent,
    CheckBoxComponent,
    RadioComponent,
    TextareaComponent,
    MultiSelectComponent,
    InputGroupComponent,
    ButtonGroupComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BaseModule],
  exports: [
    InputComponent,
    RangeSliderComponent,
    ToggleComponent,
    SelectComponent,
    CheckBoxComponent,
    RadioComponent,
    TextareaComponent,
    MultiSelectComponent,
    InputGroupComponent,
    ButtonGroupComponent,
  ],
})
export class FormModule {}
