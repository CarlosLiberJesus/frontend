import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ITextarea } from 'src/modules/elements/forms/textarea/textarea';
import { TextareaModel } from './textarea.model';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-forms-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationTextareaComponent implements OnInit {
  textarea!: ITextarea;
  srcCode!: string;

  options!: ICheckBoxList;

  constructor(public textareaModel: TextareaModel) {
    this.textareaModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.textareaModel.getOptions();
    this.startTextarea();
  }

  startTextarea(): void {
    const tTextarea: ITextarea = {
      name: 'fakeTextarea',
      placeholder: this.textareaModel.getValue('placeholderText'),
      cssTextareaContainer: ['mb-3'],
      cssTextarea: [],
    };
    if (this.textareaModel.getFormArrayValue('textareaOptions')) {
      if (
        this.textareaModel
          .getFormArrayValue('textareaOptions')
          .includes('error')
      ) {
        this.textareaModel
          .getControl('fakeTextarea')
          .setValidators([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(200),
          ]);
      } else {
        this.textareaModel.getControl('fakeTextarea').clearValidators();
      }
      this.textareaModel.getControl('fakeTextarea').updateValueAndValidity();

      this.textareaModel
        .getFormArrayValue('textareaOptions')
        .forEach((option: string) => {
          switch (option) {
            case 'label':
              tTextarea.label = {
                text: this.textareaModel.getValue('labelText') ?? '',
              };
              break;
            case 'message':
              tTextarea.message = {
                text: this.textareaModel.getValue('msgText') ?? '',
              };
              break;
            case 'disabled':
              tTextarea.cssTextarea?.push('disabled');
              break;
            case 'form-floating':
              tTextarea.cssTextareaContainer?.push('form-floating');
              break;
            case 'error':
              tTextarea.errors = {
                config: {
                  startsInvalid: false,
                },
                messages: {
                  required: 'Campo obrigatório',
                  minlength: 'O campo deve ter pelo menos 5 caracteres',
                  maxlength: 'O campo deve ter no máximo 255 caracteres',
                },
              };
              break;
            default:
              break;
          }
        });
    }

    this.textarea = tTextarea;
    this.srcCode = '\nITextarea = ' + JSON.stringify(this.textarea, null, 2);
  }

  onChanged(): void {
    this.startTextarea();
  }
}
