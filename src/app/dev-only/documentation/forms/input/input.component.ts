import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { EEvent, EPosition } from 'src/modules/elements/elements';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { IIcon } from 'src/modules/elements/base/icon/icon';
import { InputModel } from './input.model';

@Component({
  selector: 'app-bootstrap-documentation-forms-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationInputComponent implements OnInit {
  input!: IInput;
  srcCode!: string;

  options!: ICheckBoxList;
  inputType!: IRadioList;

  icon: IIcon = {
    library: 'bi',
    value: 'bi-info-square-fill',
    css: ['fs-8', 'ms-2', 'cursor-pointer'],
    popOver: {
      content: 'Mensagem importante que você deseja exibir',
      event: EEvent.HOVER,
      position: EPosition.TOP,
      cssContainer: ['fade show'],
    },
  };

  constructor(public inputModel: InputModel) {
    this.inputModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.inputModel.getOptions();
    this.inputType = this.inputModel.getInputType();
    this.startInput();
  }

  startInput() {
    const tInput: IInput = {
      name: 'fakeInput',
      type:
        this.inputModel.getValue('inputType') === 'text'
          ? EInputType.TEXT
          : EInputType.PASSWORD,
      placeholder: this.inputModel.getValue('placeholderText'),
      cssInputContainer: ['mb-3'],
      cssInput: [
        this.inputModel.getValue('color')
          ? 'border-' + this.inputModel.getValue('color')
          : '',
        this.inputModel.getValue('color')
          ? 'text-' + this.inputModel.getValue('color')
          : '',
      ].filter(Boolean),
    };
    if (this.inputModel.getFormArrayValue('inputOptions')) {
      if (this.inputModel.getFormArrayValue('inputOptions').includes('error')) {
        if (this.inputModel.getValue('inputType') === 'text') {
          this.inputModel
            .getControl('fakeInput')
            .setValidators([
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(12),
            ]);
        }
        //if (this.inputModel.getValue('inputType') === 'password') {
        //}
      } else {
        this.inputModel.getControl('fakeInput').clearValidators();
      }
      this.inputModel.getControl('fakeInput').updateValueAndValidity();

      this.inputModel
        .getFormArrayValue('inputOptions')
        .forEach((option: string) => {
          switch (option) {
            case 'label':
              tInput.label = {
                text: this.inputModel.getValue('labelText') ?? '',
                css: ['fs-5', 'fw-semibold'],
                extra: this.inputModel.getValue('extraText'),
                cssExtra: ['fs-7', 'fw-semibold', 'text-muted'],
                icon: this.icon,
              };
              break;
            case 'message':
              tInput.message = {
                text: this.inputModel.getValue('msgText') ?? '',
              };
              break;
            case 'solid':
              tInput.cssInput?.push('form-control-solid');
              break;
            case 'disabled':
              tInput.cssInput?.push('disabled');
              break;
            case 'form-floating':
              tInput.cssInputContainer?.push('form-floating');
              break;
            case 'error':
              tInput.errors = {
                config: {
                  startsInvalid: true,
                  showValid: true,
                },
                messages: {
                  required: 'Campo Obrigatório',
                  minlength: 'Minimo de 6 Caracteres',
                  maxlength: 'Maximo de 12 Caracteres',
                },
              };
              break;
            case 'icon':
              tInput.cssInputContainer?.push('position-relative');
              tInput.icon = {
                icon: {
                  library: 'fa-solid',
                  value: 'fa-user-lock',
                  css: [
                    'fs-3',
                    this.inputModel.getValue('color')
                      ? 'text-' + this.inputModel.getValue('color')
                      : '',
                  ].filter(Boolean),
                },
                position:
                  this.inputModel.getValue('position') === 'start'
                    ? EPosition.LEFT
                    : EPosition.RIGHT,
              };
              break;
            case 'show-password':
              tInput.cssInputContainer?.push('show-password');
              tInput.cssInputContainer?.push('position-relative');
              tInput.icon = {
                icon: {
                  library: 'fa-regular',
                  value: 'fa-eye',
                  antiValue: 'fa-eye-slash',
                  css: [
                    'fs-2x',
                    'cursor-pointer',
                    'opacity-50',
                    this.inputModel.getValue('color')
                      ? 'text-' + this.inputModel.getValue('color')
                      : '',
                  ].filter(Boolean),
                },
                position: EPosition.RIGHT,
              };
              break;
            default:
              break;
          }
        });
    }

    this.input = tInput;
    this.srcCode = '\nIInput = ' + JSON.stringify(this.input, null, 2);
  }

  onChanged() {
    this.options = this.inputModel.getOptions();
    this.startInput();
  }
}
