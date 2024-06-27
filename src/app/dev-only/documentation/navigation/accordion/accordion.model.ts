import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { ISelect } from 'src/modules/elements/forms/select/select';

export class AccordionModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      tabOne: new FormControl('Conteúdo na aba exibida', []),
      tabTwo: new FormControl('Alternar seu conteúdo na aba exibida', []),
      tabThree: new FormControl('Apenas preencha ng-template', []),
      style: new FormControl('two', []),
    });
  }
  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getFormArray(arrayName: string): FormArray {
    return this.formGroup.get(arrayName) as FormArray;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
  }
  getFormArrayValue(arrayName: string): string[] {
    return this.getFormArray(arrayName).controls.map(control => control.value);
  }

  getInputText(name: string, placeholder: string): IInput {
    return {
      name: 'text' + name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  // TODO disable & more
  getAccordionOptions(): ICheckBoxList {
    return {
      name: 'accordionOptions',
      checkbox: [
        {
          text: 'one',
          value: 'one',
        },
        {
          text: 'two',
          value: 'two',
        },
        {
          text: 'three',
          value: 'three',
        },
      ],
    };
  }

  getStyleOptions(): ISelect {
    return {
      name: 'Estilos de Acordeão',
      placeholder: 'Accordion Styles',
      css: ['floating'],
      cssOption: ['text-dark'],
      option: [
        {
          text: 'Estilo Um',
          value: 'one',
        },
        {
          text: 'Estilo Dois',
          value: 'two',
        },
        {
          text: 'Estilo Três',
          value: 'three',
        },
      ],
    };
  }
}
