import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IOption } from 'src/modules/elements/forms/select/select';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export class SelectModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeSelect: new FormControl(null, []),
      selectOptions: new FormArray([], []),
      styleOptions: new FormControl('default', []),
      labelText: new FormControl('Adicionar Título', []),
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

  getSelectOptions(): ICheckBoxList {
    return {
      name: 'select-options',
      css: [
        'mb-3',
        'me-5',
        'form-check-inline',
        'form-check-white',
        'form-check-ancap',
        'gap-2',
      ],
      cssContainer: ['force-inline-align', 'gap-1'],
      checkbox: [
        {
          text: 'Mostrar Etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar Mensagem',
          value: 'message',
        },
        {
          text: 'Activar Erros',
          value: 'error',
        },
        {
          text: 'Desativado',
          value: 'disabled',
        },
        {
          text: 'Sólido',
          value: 'form-control-solid',
        },
        {
          text: 'Flutuante',
          value: 'floating',
        },
        {
          text: 'Desactivar Seleção',
          value: 'unselect',
        },
        {
          text: 'Mostrar Ícone Selecionado',
          value: 'icon-check',
        },
        {
          text: 'Activo',
          value: 'active',
        },
        {
          text: 'Pesquisar',
          value: 'search',
        },
        {
          text: 'Sem Margens',
          value: 'borderless',
        },
      ],
    };
  }

  getStylesOptions(): IRadioList {
    return {
      name: 'select-styles',
      css: [
        'gap-1',
        'mb-2',
        'form-check-white',
        'form-check-ancap',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Padrão',
          value: 'default',
        },
        {
          text: 'Cores',
          value: 'colors',
        },
        {
          text: 'Ícones',
          value: 'icons',
        },
        {
          text: 'Avatares',
          value: 'avatar',
        },
      ],
    };
  }

  getDefaultOptions(): IOption[] {
    return [
      {
        text: 'Opção 1',
        css: ['text-dark'],
        value: 'value1',
      },
      {
        text: 'Opção 2',
        value: 'value2',
        css: ['text-dark'],
      },
      {
        text: 'Opção 3',
        value: 'value3',
        css: ['text-dark'],
      },
      {
        text: 'Opção 4',
        value: 'value4',
        css: ['text-dark'],
      },
    ];
  }

  getAvatarOptions(): IOption[] {
    return [
      {
        text: 'Opção 1',
        css: ['text-dark', 'd-flex', 'align-items-center'],
        value: 'value1',
        avatar: {
          img: 'assets/media/avatars/blank.png',
          css: ['symbol-25px'],
        },
      },
      {
        text: 'Opção 2',
        css: ['text-dark'],
        value: 'value2',
        avatar: {
          img: 'assets/media/avatars/blank.png',
          css: ['symbol-25px'],
        },
      },
      {
        text: 'Opção 3',
        css: ['text-dark'],
        value: 'value3',
        avatar: {
          img: 'assets/media/avatars/blank.png',
          css: ['symbol-25px'],
        },
      },
      {
        text: 'Opção 4',
        css: ['text-dark'],
        value: 'value4',
        avatar: {
          img: 'assets/media/avatars/blank.png',
          css: ['symbol-25px'],
        },
      },
    ];
  }

  getIconsOptions(): IOption[] {
    return [
      {
        text: 'Opção 1',
        css: ['text-dark'],
        value: 'value1',
        icon: {
          library: 'socicon',
          value: 'socicon-warcraft',
          css: ['fs-2'],
        },
      },
      {
        text: 'Opção 2',
        value: 'value2',
        css: ['text-dark'],
        icon: {
          library: 'fa-brands',
          value: 'fa-jedi-order',
          css: ['fs-2'],
        },
      },
      {
        text: 'Opção 3',
        value: 'value3',
        css: ['text-dark'],
        icon: {
          library: 'fa-brands',
          value: 'fa-wizards-of-the-coast',
          css: ['fs-2'],
        },
      },
      {
        text: 'Opção 4',
        value: 'value4',
        css: ['text-dark'],
        icon: {
          library: 'fa-brands',
          value: 'fa-battle-net',
          css: ['fs-2'],
        },
      },
    ];
  }

  getColorOptions(): IOption[] {
    return [
      {
        text: 'Branco',
        value: 'white',
        color: 'bg-white',
        css: ['text-dark'],
      },
      {
        text: 'Primária',
        value: 'primary',
        color: 'bg-primary',
        css: ['text-dark'],
      },
      {
        text: 'Secundária',
        value: 'secondary',
        color: 'bg-secondary',
        css: ['text-dark'],
      },
      {
        text: 'Sucesso',
        value: 'success',
        color: 'bg-success',
        css: ['text-dark'],
      },
      {
        text: 'Informação',
        value: 'info',
        color: 'bg-info',
        css: ['text-dark'],
      },
      {
        text: 'Alerta',
        value: 'warning',
        color: 'bg-warning',
        css: ['text-dark'],
      },
      {
        text: 'Perigo',
        value: 'danger',
        color: 'bg-danger',
        css: ['text-dark'],
      },
      {
        text: 'Claro',
        value: 'light',
        color: 'bg-light',
        css: ['text-dark'],
      },
      {
        text: 'Escuro',
        value: 'dark',
        color: 'bg-dark',
        css: ['text-dark'],
      },
    ];
  }
}
