import { FormGroup, FormControl } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';

export class SizesModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Imagine o Texto', []),
      options: new FormControl('col-auto', []),
      percent: new FormControl(0, []),
      fixedHorizontal: new FormControl(0, []),
      fixedVertical: new FormControl(0, []),
      minHorizontal: new FormControl(0, []),
      minVertical: new FormControl(0, []),
      maxHorizontal: new FormControl(0, []),
      maxVertical: new FormControl(0, []),
      topMargin: new FormControl(0, []),
      bottomMargin: new FormControl(0, []),
      leftMargin: new FormControl(0, []),
      rightMargin: new FormControl(0, []),
      topPadding: new FormControl(0, []),
      bottomPadding: new FormControl(0, []),
      leftPadding: new FormControl(0, []),
      rightPadding: new FormControl(0, []),
      borderRadius: new FormControl(0, []),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string | number {
    return this.getControl(controlName).value;
  }

  getInputText(): IInput {
    return {
      name: 'text',
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: 'Texto a ser usado',
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getOptions(): IRadioList {
    return {
      name: 'radio',
      css: [
        'mb-3',
        'me-5',
        'gap-2',
        'form-check-primary',
        'form-check-white',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Auto',
          value: 'col-auto',
        },
        {
          text: 'Percentagem',
          value: 'percent',
        },
        {
          text: 'Fixo',
          value: 'fixed',
        },
        {
          text: 'Mín',
          value: 'min',
        },
        {
          text: 'Máx',
          value: 'max',
        },
      ],
    };
  }

  getPercentOptions(): IRangeSlider {
    return {
      name: 'percentages',
      autoReturn: true,
      css: ['mb-3'],
      valuesList: ['25', '50', '75', '100'],
    };
  }

  getSizeOptions(name = 'fakeSize'): IRangeSlider {
    return {
      name: name,
      autoReturn: true,
      css: ['mb-3'],
      valuesList: [
        '50',
        '75',
        '100',
        '150',
        '200',
        '250',
        '300',
        '350',
        '400',
        '450',
        '500',
      ],
    };
  }

  getSeparatorOptions(
    name = 'fakeSeparator',
    placeholder = 'fakeSeparator'
  ): IRangeSlider {
    return {
      name: name,
      placeholder: placeholder,
      autoReturn: true,
      css: ['mb-3'],
      valuesList: ['0', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    };
  }
}
