import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BordersModel } from './borders.model';
import { FormControl } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-intro-borders',
  templateUrl: './borders.component.html',
  styleUrls: ['./borders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationBordersComponent implements OnInit {
  srcCode!: string;

  marginOptions!: ICheckBoxList;

  constructor(public bordersModel: BordersModel) {
    this.bordersModel.startForms();
  }

  ngOnInit(): void {
    this.marginOptions = this.bordersModel.getMarginOptions();
  }

  getCss(): string {
    const { color, width, border, sides, text } = {
      color: this.bordersModel.getValue('color'),
      width: +this.bordersModel.getValue('width'),
      border: this.bordersModel.getValue('border'),
      sides: this.bordersModel.getFormArrayValue('sides'),
      text: this.bordersModel.getValue('text'),
    };
    const borderClasses = [];
    let classes = 'p-4 bg-secondary';

    if (color !== 'gray-200') {
      borderClasses.push('border-' + color);
    }

    if (this.bordersModel.getValue('border') !== 'none') {
      if (width) {
        borderClasses.push(
          'border-' + this.bordersModel.getWidthOptions().valuesList[width]
        );
      }
    }

    if (sides.length === 0) {
      this.bordersModel.getFormArray('sides').push(new FormControl('all', []));
    }

    if (border !== 'none' && sides.length > 0) {
      if (sides.includes('all')) {
        if (sides.length === 1) {
          borderClasses.push(
            border !== 'default' ? 'border border-' + border : 'border'
          );
        } else {
          const filteredSides = sides.filter(side => side !== 'all');
          this.bordersModel.resetFormArray();

          filteredSides.forEach(side => {
            this.bordersModel
              .getFormArray('sides')
              .push(new FormControl(side, []));
            borderClasses.push(
              'border-' + side + (border !== 'default' ? '-' + border : '')
            );
          });
        }
      } else {
        sides.forEach(side => {
          borderClasses.push(
            'border-' + side + (border !== 'default' ? '-' + border : ' ')
          );
        });
        if (border !== 'default' && color === 'gray-200') {
          borderClasses.push('border-gray-200');
        }
      }
    }

    if (
      this.bordersModel.getValue('rounded') &&
      this.bordersModel.getValue('style') === 'rounded'
    ) {
      borderClasses.push(
        'rounded-' + this.bordersModel.getWidthOptions().valuesList[width]
      );
    }

    if (this.bordersModel.getValue('style') !== 'rounded') {
      let result = 'rounded-' + this.bordersModel.getValue('style');
      if (
        this.bordersModel.getValue('style') !== 'circle' &&
        this.bordersModel.getValue('style') !== 'pill'
      ) {
        result += '-' + this.bordersModel.getWidthOptions().valuesList[width];
      }
      borderClasses.push(result);
    }

    classes += ' ' + borderClasses.join(' ');

    this.srcCode = '\n<span class="' + classes + '">' + text + '</span>';

    return classes;
  }

  onChanged() {
    this.getCss();
  }
}
