import { FormControl, FormGroup } from '@angular/forms';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';

export class BadgeModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('+9', []),
      color: new FormControl(null, []),
      toggle: new FormControl(false, []),
      badge: new FormControl(null, []),
    });
  }
  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string | undefined {
    return this.getControl(controlName).value ?? undefined;
  }

  getInputText(): IInput {
    return {
      name: 'text',
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: 'Texto a ser usado',
      cssInputContainer: ['form-floating'],
    };
  }

  getColorOptions(): ISelect {
    return {
      name: 'colors',
      cssOption: ['text-dark'],
      placeholder: 'Selecione uma cor',
      css: ['floating'],
      option: [
        {
          text: 'Branco',
          value: 'white',
          color: 'bg-white',
        },
        {
          text: 'Primário',
          value: 'primary',
          color: 'bg-primary',
        },
        {
          text: 'Secundário',
          value: 'secondary',
          color: 'bg-secondary',
        },
        {
          text: 'Sucesso',
          value: 'success',
          color: 'bg-success',
        },
        {
          text: 'Informação',
          value: 'info',
          color: 'bg-info',
        },
        {
          text: 'Aviso',
          value: 'warning',
          color: 'bg-warning',
        },
        {
          text: 'Perigo',
          value: 'danger',
          color: 'bg-danger',
        },
        {
          text: 'Claro',
          value: 'light',
          color: 'bg-light',
        },
        {
          text: 'Escuro',
          value: 'dark',
          color: 'bg-dark',
        },
      ],
    };
  }

  getBadgeOptions(): ISelect {
    //toggle
    const select: ISelect = {
      name: 'badge',
      cssOption: ['text-dark'],
      placeholder: 'Selecione o Estilo',
      css: ['floating'],
      option: [
        {
          text: 'Padrão',
          value: 'null',
        },
        {
          text: 'Círculo',
          value: 'badge-circle',
        },
        {
          text: 'Quadrado',
          value: 'badge-square',
        },
      ],
    };
    if (!this.getValue('toggle')) {
      select.option.push(
        {
          text: 'Contorno',
          value: 'badge-outline',
        },
        {
          text: 'Contorno de Círculo',
          value: 'badge-circle badge-outline',
        },
        {
          text: 'Contorno de Quadrado',
          value: 'badge-square badge-outline',
        }
      );
    }
    return select;
  }

  getToggleOptions(): IToggle {
    return {
      name: 'toggle',
      text: 'Cores Claras?',
      css: ['gap-2', 'form-check-ancap', 'no-border', 'form-check-solid-white'],
      size: ['h-30px', 'w-50px'],
    };
  }
}
