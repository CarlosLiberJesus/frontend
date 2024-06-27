import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToggleModel } from './toggle.model';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { Validators } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-forms-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationToggleComponent implements OnInit {
  srcCode!: string;
  toggle!: IToggle;

  isDynamic = false;

  options!: ICheckBoxList;

  constructor(public toggleModel: ToggleModel) {
    this.toggleModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.toggleModel.getOptions();
    this.startToggle();
  }

  startToggle(): void {
    const toggle: IToggle = {
      name: 'fakeToggle',
      text: 'Fechado',
      antiText: 'Aberto',
      css: ['gap-2'],
    };

    const options = this.toggleModel.getFormArrayValue('options');
    if (!options.includes('error')) {
      this.toggleModel.getControl('fakeToggle').clearValidators();
      this.toggleModel.getControl('fakeToggle').updateValueAndValidity();
    }

    if (options) {
      this.isDynamic = false;
      options.forEach((option: string) => {
        switch (option) {
          case 'label':
            toggle.label = {
              text: this.toggleModel.getValue('labelText') ?? '',
            };
            break;
          case 'message':
            toggle.message = {
              text: this.toggleModel.getValue('msgText') ?? '',
            };
            break;
          case 'error':
            this.toggleModel
              .getControl('fakeToggle')
              .setValidators([Validators.required]);
            this.toggleModel.getControl('fakeToggle').updateValueAndValidity();

            toggle.errors = {
              config: {
                startsInvalid: true,
              },
              messages: {
                required: 'Este campo é obrigatório.',
              },
            };
            break;
          case 'disabled':
            toggle.css?.push('disabled');
            break;
          case 'no-border':
            toggle.css?.push('no-border');
            break;
          case 'form-check-solid':
            toggle.css?.push('form-check-solid');
            break;
          case 'form-check-custom':
            toggle.css?.push('form-check-custom');
            break;
          case 'dynamic':
            this.isDynamic = true;
            break;
        }
      });
    }

    const color = this.toggleModel.getValue('color');
    if (color) {
      toggle.css?.push('form-check-' + color, 'no-border');
    }
    const size = this.toggleModel.getValue('size');
    if (size) {
      toggle.size = [this.toggleModel.getSizeOptions().valuesList[+size]];
    }

    this.toggle = toggle;
    this.srcCode = '\nIToggle = ' + JSON.stringify(toggle, null, 2);
  }

  onChange(): void {
    this.startToggle();
  }
}
