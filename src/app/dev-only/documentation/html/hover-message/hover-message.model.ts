import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

export class HoverMessageModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      type: new FormControl('popover', []),
      event: new FormControl('click', []),
      position: new FormControl('top', []),
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

  getTypeOptions(): IRadioList {
    return {
      name: 'type',
      css: ['mb-2', 'form-check-white', 'gap-2', 'form-check-inline'],
      radio: [
        {
          value: 'popover',
          text: 'Popover',
        },
        {
          value: 'tooltip',
          text: 'Tooltip',
        },
      ],
    };
  }

  getEventOptions(): IRadioList {
    return {
      name: 'event',
      css: ['mb-2', 'form-check-white', 'gap-2', 'form-check-inline'],
      radio: [
        {
          value: 'click',
          text: 'Clique',
        },
        {
          value: 'hover',
          text: 'Hover',
        },
      ],
    };
  }

  getPositionOptions(): IRadioList {
    return {
      name: 'position',
      css: ['form-check-inline', 'mb-2', 'form-check-white', 'gap-2'],
      radio: [
        {
          value: 'top',
          text: 'Topo',
        },
        {
          value: 'bottom',
          text: 'Fundo',
        },
        {
          value: 'left',
          text: 'Esquerda',
        },
        {
          value: 'right',
          text: 'Direita',
        },
      ],
    };
  }
}
