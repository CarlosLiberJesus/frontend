import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  ICheckBox,
  ICheckBoxList,
} from 'src/modules/elements/forms/check-box/check-box';
import { CheckBoxModel } from './check-box.model';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-forms-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationCheckBoxComponent implements OnInit {
  checkBoxList!: ICheckBoxList;
  srcCode!: string;
  isDynamicSize = false;

  directions!: IRadioList;
  options!: ICheckBoxList;

  constructor(public checkModel: CheckBoxModel) {
    this.checkModel.startForms();
  }

  ngOnInit(): void {
    this.directions = this.checkModel.getDirectionOptions();
    this.options = this.checkModel.getOptions();
    this.startCheckBox();
  }

  startCheckBox(): void {
    const margins = this.calculateMargins();
    const padding = this.calculatePadding();

    this.checkBoxList = {
      name: 'radio',
      css: [
        ...margins,
        padding,
        this.checkModel.getValue('directionControl') ?? '',
        this.getRadioColorCss(),
      ].filter(Boolean),
      checkbox: this.generateRadioOptions(),
    };
    if (this.checkModel.getFormArrayValue('optionsControl').includes('label')) {
      this.checkBoxList.label = {
        text: this.checkModel.getValue('labelText'),
      };
    }
    if (
      this.checkModel.getFormArrayValue('optionsControl').includes('message')
    ) {
      this.checkBoxList.message = {
        text: this.checkModel.getValue('msgText'),
      };
    }
    if (this.checkModel.getFormArrayValue('optionsControl').includes('error')) {
      this.checkModel
        .getControl('fakeCheckBox')
        .setValidators([Validators.required]);
      this.checkModel.getControl('fakeCheckBox').updateValueAndValidity();
      this.checkBoxList.errors = {
        config: {
          startsInvalid: false,
        },
        messages: {
          required: 'Este campo é obrigatório.',
        },
      };
    } else {
      this.checkModel.getControl('fakeCheckBox').clearValidators();
      this.checkModel.getControl('fakeCheckBox').updateValueAndValidity();
    }

    this.applyDynamicOptions();

    if (!this.isDynamicSize) {
      if (
        this.checkModel.getValue('hardSizeControl') !== 'form-check-default'
      ) {
        this.checkBoxList.css?.push(
          this.checkModel.getValue('hardSizeControl') ?? ''
        );
      }
    }

    this.srcCode =
      '\nICheckBoxList = ' + JSON.stringify(this.checkBoxList, null, 2);
  }

  calculateMargins(): string[] {
    const margins: string[] = [];
    if (this.checkModel.getValue('marginControl')) {
      const directionControl = this.checkModel.getValue('directionControl');
      margins.push(
        (directionControl === '' ? 'mb-' : 'me-') +
          this.checkModel.getValue('marginControl')
      );
    }
    return margins;
  }

  calculatePadding(): string {
    return this.checkModel.getValue('paddingControl')
      ? 'gap-' + this.checkModel.getValue('paddingControl')
      : '';
  }

  getRadioColorCss(): string {
    return this.checkModel.getValue('colorControl')
      ? 'form-check-' + this.checkModel.getValue('colorControl')
      : '';
  }

  generateRadioOptions(): ICheckBox[] {
    return [
      { text: 'Option 1', value: 'value1' },
      { text: 'Option 2', value: 'value2' },
      { text: 'Option 3', value: 'value3' },
    ];
  }

  applyDynamicOptions(): void {
    if (this.checkModel.getFormArrayValue('optionsControl')) {
      this.isDynamicSize = false;
      this.checkModel
        .getFormArrayValue('optionsControl')
        .forEach((option: string) => {
          switch (option) {
            case 'disabled': {
              this.applyCssToAllRadios('disabled');
              break;
            }
            case 'form-check-solid': {
              this.checkBoxList.css?.push('form-check-solid');
              break;
            }
            case 'form-check-white': {
              this.checkBoxList.css?.push('form-check-white');
              break;
            }
            case 'form-label': {
              this.checkBoxList.css?.push('form-label');
              break;
            }
            case 'no-border': {
              this.applyCssToAllRadios('no-border');
              break;
            }
            case 'dynamic': {
              this.isDynamicSize = true;
              const pos: number =
                (this.checkModel.getValue(
                  'sizeControl'
                ) as unknown as number) ?? '0';
              const size: string =
                this.checkModel.getDynamicSizeOptions().valuesList[pos];
              this.applyCssToAllRadios(size);
              break;
            }
            default: {
              break;
            }
          }
        });
    }
  }

  applyCssToAllRadios(css: string): void {
    this.checkBoxList.checkbox.map((radio: ICheckBox) => {
      radio.css ? radio.css.push(css) : (radio.css = [css]);
    });
  }

  onChange(): void {
    this.startCheckBox();
  }
}
