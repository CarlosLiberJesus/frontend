import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SizesModel } from './sizes.model';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-intro-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationSizesComponent implements OnInit {
  srcCode!: string;

  options!: IRadioList;

  constructor(public sizesModel: SizesModel) {
    this.sizesModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.sizesModel.getOptions();
  }

  getCss(): string {
    let classes = 'bg-secondary';
    if (this.sizesModel.getValue('options')) {
      switch (this.sizesModel.getValue('options')) {
        case 'col-auto':
          classes += ' col-auto';
          break;
        case 'percent':
          classes +=
            ' w-' +
            this.sizesModel.getPercentOptions().valuesList[
              +this.sizesModel.getValue('percent')
            ];
          break;
        case 'fixed':
          classes +=
            ' w-' +
            this.sizesModel.getSizeOptions().valuesList[
              +this.sizesModel.getValue('fixedHorizontal')
            ] +
            'px';
          classes +=
            ' h-' +
            this.sizesModel.getSizeOptions().valuesList[
              +this.sizesModel.getValue('fixedVertical')
            ] +
            'px';
          break;
        case 'min':
          classes +=
            ' min-w-' +
            this.sizesModel.getSizeOptions().valuesList[
              +this.sizesModel.getValue('minHorizontal')
            ] +
            'px';
          classes +=
            ' min-h-' +
            this.sizesModel.getSizeOptions().valuesList[
              +this.sizesModel.getValue('minVertical')
            ] +
            'px';
          break;
        case 'max':
          classes +=
            ' mw-' +
            this.sizesModel.getSizeOptions().valuesList[
              +this.sizesModel.getValue('maxHorizontal')
            ] +
            'px';
          classes +=
            ' mh-' +
            this.sizesModel.getSizeOptions().valuesList[
              +this.sizesModel.getValue('maxVertical')
            ] +
            'px';
          break;
        default:
          break;
      }
    }
    classes += ' ms-' + this.sizesModel.getValue('leftMargin');
    classes += ' mt-' + this.sizesModel.getValue('topMargin');
    classes += ' me-' + this.sizesModel.getValue('rightMargin');
    classes += ' mb-' + this.sizesModel.getValue('bottomMargin');

    classes += ' ps-' + this.sizesModel.getValue('leftPadding');
    classes += ' pt-' + this.sizesModel.getValue('topPadding');
    classes += ' pe-' + this.sizesModel.getValue('rightPadding');
    classes += ' pb-' + this.sizesModel.getValue('bottomPadding');
    this.srcCode =
      '\n<span class="' +
      classes +
      '">' +
      this.sizesModel.getValue('text') +
      '</span>';
    return classes;
  }

  onChanged() {
    this.getCss();
  }
}
