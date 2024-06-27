import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IButtonGroupElement } from 'src/modules/elements/forms/button-group/button-group';

export class ButtonGroupModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeButtonGroup: new FormArray([], []),
      optionsControl: new FormArray(
        [new FormControl('label'), new FormControl('icon')],
        []
      ),
      labelText: new FormControl('Adicionar título', []),
      extraText: new FormControl('Adicione também uma mensagem extra', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
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
      name: name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getOptions(): ICheckBoxList {
    const options: ICheckBoxList = {
      name: 'check-box',
      css: ['mb-3', 'me-5', 'form-check-inline', 'form-check-white', 'gap-2'],
      cssContainer: ['force-inline-align', 'gap-1'],
      checkbox: [
        {
          text: 'Mostrar etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar mensagem',
          value: 'message',
        },
        {
          text: 'Mostrar erros',
          value: 'errors',
        },
        {
          text: 'Dois por linha',
          value: 'perrow',
        },
        {
          text: 'Múltiplo',
          value: 'multiple',
        },
      ],
    };
    if (!this.getFormArrayValue('optionsControl').includes('multiple')) {
      options.checkbox.push({
        text: 'Desmarcar',
        value: 'unselect',
      });
    }

    if (this.getFormArrayValue('optionsControl').includes('label')) {
      options.checkbox.push({
        text: 'Mostrar Ícon',
        value: 'icon',
      });
    }

    return options;
  }

  getDefaultButtons(): IButtonGroupElement[] {
    return [
      {
        button: {
          text: 'Botão 1',
          css: [
            'btn',
            'btn-outline',
            'btn-color-muted',
            'd-flex',
            'justify-content-center',
            'align-items-center',
          ],
        },
        value: 'button1',
      },
      {
        button: {
          text: 'Botão 2',
          css: [
            'btn',
            'btn-outline',
            'btn-color-muted',
            'w-125px',
            'd-flex',
            'justify-content-center',
            'align-items-center',
          ],
        },
        value: 'button2',
      },
      {
        button: {
          iconFirst: {
            library: 'ki-duotone',
            value: 'ki-abstract-25',
            css: ['fs-2qx', 'd-flex'],
          },
          css: [
            'btn',
            'btn-outline',
            'btn-color-muted',
            'd-flex',
            'justify-content-center',
            'align-items-center',
          ],
        },
        value: 'button3',
      },
      {
        button: {
          color: {
            css: [
              'border',
              'border-dark',
              'border-2',
              'rounded-2',
              'shadow',
              'w-25px',
              'h-25px',
              'bg-primary',
              'd-block',
            ],
          },
          css: [
            'btn',
            'btn-outline',
            'btn-color-muted',
            'd-flex',
            'justify-content-center',
            'align-items-center',
          ],
        },
        value: 'button4',
      },
    ];
  }
}
