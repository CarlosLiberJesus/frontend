import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { DocumentationToggleComponent } from './toggle/toggle.component';
import { ToggleModel } from './toggle/toggle.model';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { DocumentationInputComponent } from './input/input.component';
import { InputModel } from './input/input.model';
import { DocumentationRadioComponent } from './radio/radio.component';
import { RadioModel } from './radio/radio.model';
import { DocumentationTextareaComponent } from './textarea/textarea.component';
import { TextareaModel } from './textarea/textarea.model';
import { DocumentationSelectComponent } from './select/select.component';
import { SelectModel } from './select/select.model';
import { DocumentationSliddlerComponent } from './range-slider/range-slider.component';
import { RangeSliderModel } from './range-slider/range-slider.model';
import { DocumentationMultiSelectComponent } from './multi-select/multi-select.component';
import { DocumentationInputGroupComponent } from './input-group/input-group.component';
import { InputGroupModel } from './input-group/input-group.model';
import { MultiSelectModel } from './multi-select/multi-select.model';
import { DocumentationCheckBoxComponent } from './check-box/check-box.component';
import { CheckBoxModel } from './check-box/check-box.model';
import { DocumentationButtonGroupComponent } from './button-group/button-group.component';
import { ButtonGroupModel } from './button-group/button-group.model';
import { CodeHighlightModule } from '../code-highlight/code-highlight.module';

@NgModule({
  declarations: [
    FormsComponent,
    DocumentationToggleComponent,
    DocumentationInputComponent,
    DocumentationRadioComponent,
    DocumentationTextareaComponent,
    DocumentationSelectComponent,
    DocumentationSliddlerComponent,
    DocumentationMultiSelectComponent,
    DocumentationInputGroupComponent,
    DocumentationCheckBoxComponent,
    DocumentationButtonGroupComponent,
  ],
  imports: [CommonModule, FormModule, CodeHighlightModule],
  providers: [
    ToggleModel,
    InputModel,
    RadioModel,
    TextareaModel,
    SelectModel,
    RangeSliderModel,
    MultiSelectModel,
    InputGroupModel,
    CheckBoxModel,
    ButtonGroupModel,
  ],
  exports: [FormsComponent],
})
export class DocumentationFormsModule {}
