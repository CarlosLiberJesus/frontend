import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IPagination } from 'src/modules/elements/html/pagination/pagination';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { PaginationModel } from './pagination.model';

@Component({
  selector: 'app-bootstrap-documentation-html-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationPaginationComponent implements OnInit {
  srcCode!: string;
  pagination!: IPagination;

  options!: ICheckBoxList;

  constructor(public paginationModel: PaginationModel) {
    this.paginationModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.paginationModel.getOptions();
    this.getPagination();
  }

  getPagination() {
    this.pagination = {
      page: +this.paginationModel.getValue('page'),
      perPage: +this.paginationModel.getValue('perPage'),
      total: +this.paginationModel.getValue('total'),
    };
    if (this.paginationModel.getValue('style') !== 'square') {
      this.pagination.css = this.paginationModel.getValue('style').split(' ');
    }
    if (this.paginationModel.getValue('options').includes('extremes')) {
      this.pagination.css
        ? this.pagination.css.push('extremes')
        : (this.pagination.css = ['extremes']);
    }
    if (this.paginationModel.getValue('options').includes('text')) {
      this.pagination.text = {
        previous: 'Anterior',
        next: 'Seguinte',
      };
      if (this.paginationModel.getValue('options').includes('extremes')) {
        this.pagination.text = {
          ...this.pagination.text,
          first: 'Primeiro',
          last: 'Último',
        };
      }
    }
    if (this.paginationModel.getValue('options').includes('short')) {
      this.pagination.maxPages = 5;
    }
    if (this.paginationModel.getValue('options').includes('hide')) {
      this.pagination.css
        ? this.pagination.css.push('hide')
        : (this.pagination.css = ['hide']);
    }

    this.srcCode =
      '\nIPagination = ' + JSON.stringify(this.pagination, null, 2);
  }

  onChange() {
    this.getPagination();
  }
}
