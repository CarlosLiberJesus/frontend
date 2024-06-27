import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';

export class TableModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      options: new FormControl('', []),
      divider: new FormControl(false, []),
      spacingX: new FormControl(0, []),
      spacingY: new FormControl(0, []),
      spacingStart: new FormControl(0, []),
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

  getOptions(): IRadioList {
    return {
      name: 'options',
      css: ['mb-3', 'me-5', 'gap-2', 'form-check-inline', 'form-check-white'],
      radio: [
        {
          text: 'Lista Check',
          value: 'form',
        },
        {
          text: 'Com Margens',
          value: 'bordered',
        },
        {
          text: 'Espaçamento de Células',
          value: 'spacing',
        },
        {
          text: 'Divisor de Linhas',
          value: 'divider',
        },
        {
          text: 'Listrado',
          value: 'striped',
        },
        {
          text: 'Arredondado',
          value: 'rounded',
        },
        {
          text: 'Limpar',
          value: 'flush',
        },
        {
          text: 'Sensível ao Hover',
          value: 'hoverable',
        },
        {
          text: 'Responsivo',
          value: 'responsive',
        },
        {
          text: 'Ordenação',
          value: 'sorting',
        },
      ],
    };
  }

  getDivider(): IToggle {
    return {
      name: 'divider',
      css: [
        'gap-2',
        'form-check-primary',
        'no-border',
        'form-check-solid-white',
      ],
      size: ['h-25px', 'w-40px'],
      text: 'Sólido',
      antiText: 'Tracejado',
    };
  }

  getSpacingX(): IRangeSlider {
    return {
      name: 'spacingX',
      placeholder: 'gx-',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }

  getSpacingY(): IRangeSlider {
    return {
      name: 'spacingY',
      placeholder: 'gy-',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }

  getSpacingStart(): IRangeSlider {
    return {
      name: 'spacingStart',
      placeholder: 'gs-',
      css: ['mb-5'],
      valuesList: ['0', '1', '2', '3', '4', '5'],
    };
  }
}
