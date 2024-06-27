import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableModel } from './table.model';
import { ESort, ITable } from 'src/modules/elements/html/table/table';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-html-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationTableComponent implements AfterViewInit {
  srcCode!: string;
  table!: ITable;
  @ViewChild('rowTemplate', { read: TemplateRef })
  rowTemplate!: TemplateRef<HTMLElement>;

  options!: IRadioList;

  constructor(
    public tableModel: TableModel,
    private cdr: ChangeDetectorRef
  ) {
    this.tableModel.startForms();
  }

  ngAfterViewInit(): void {
    this.options = this.tableModel.getOptions();
    this.startTable();
  }

  startTable(): void {
    const table: ITable = {
      title: 'Table title',
      toolbar: null,
      card: {
        css: ['card-flush'],
        body: ['p-0'],
      },
      css: [],
      tableHeaders: {
        css: [],
        columns: [
          { name: 'Name' },
          { name: 'Position' },
          { name: 'Office' },
          { name: 'Age' },
          { name: 'Start date' },
          { name: 'Salary' },
        ],
      },
      rowTemplate: null,
      cardTemplate: null,
    };
    if (this.tableModel.getValue('options') === 'bordered') {
      table.tableHeaders.css = this.getHeaderCss();
      table.css?.push('table-bordered');
    }
    if (this.tableModel.getValue('options') === 'form') {
      table.css?.push('table-form'); // TODO implement
    }
    if (this.tableModel.getValue('options') === 'spacing') {
      table.css?.push(
        'gx-' +
          this.tableModel.getValue('spacingX') +
          ' gy-' +
          this.tableModel.getValue('spacingY') +
          ' gs-' +
          this.tableModel.getValue('spacingStart')
      );
    }
    if (this.tableModel.getValue('options') === 'divider') {
      table.tableHeaders.css = this.getHeaderCss();
      if (this.tableModel.getValue('divider')) {
        table.css?.push('table-row-dashed table-row-gray-300');
      } else {
        table.css?.push('table-row-bordered table-row-gray-300');
      }
    }
    if (this.tableModel.getValue('options') === 'striped') {
      table.tableHeaders.css = this.getHeaderCss(true);
      table.css?.push('table-striped');
    }
    if (this.tableModel.getValue('options') === 'rounded') {
      table.tableHeaders.css = this.getHeaderCss(true);
      table.css?.push('table-rounded', 'border');
    }
    if (this.tableModel.getValue('options') === 'flush') {
      table.tableHeaders.css = this.getHeaderCss(true);
      table.css?.push('table-flush');
    }
    if (this.tableModel.getValue('options') === 'hoverable') {
      table.css?.push('table-hover');
      table.tableHeaders.css = this.getHeaderCss(true);
    }
    if (this.tableModel.getValue('options') === 'responsive') {
      table.tableHeaders.columns[0].css = ['min-w-100px'];
      table.tableHeaders.columns[1].css = ['min-w-150px'];
      table.tableHeaders.columns[2].css = ['min-w-100px'];
      table.tableHeaders.css = this.getHeaderCss(true);
    }
    if (this.tableModel.getValue('options') === 'sorting') {
      table.tableHeaders.columns[0].sort = ESort.ASC;
      table.tableHeaders.columns[1].sort = ESort.DESC;
      table.tableHeaders.css = this.getHeaderCss(true);
    }
    if (
      this.tableModel.getValue('options') === '' ||
      this.tableModel.getValue('options') === 'form'
    ) {
      table.tableHeaders.css = this.getHeaderCss(true);
    }

    this.srcCode = '\nITable = ' + JSON.stringify(table, null, 2);

    table.tableData = [
      {
        uuid: 'elem1',
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        start_date: '2011/04/25',
        salary: '$320,800',
      },
      {
        uuid: 'elem2',
        name: 'Garrett Winters',
        position: 'Accountants',
        office: 'Tokyo',
        age: '63',
        start_date: '2011/07/25',
        salary: '$170,750',
      },
      {
        uuid: 'elem3',
        name: 'Ashton Cox',
        position: 'Technical Author',
        office: 'San Francisco',
        age: '66',
        start_date: '2009/01/12',
        salary: '$86,000',
      },
      {
        uuid: 'elem4',
        name: 'Cedric Kelly',
        position: 'Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        start_date: '2012/03/29',
        salary: '$433,060',
      },
      {
        uuid: 'elem5',
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        start_date: '2008/11/28',
        salary: '$162,700',
      },
      {
        uuid: 'elem6',
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: '61',
        start_date: '2012/12/02',
        salary: '$372,000',
      },
      {
        uuid: 'elem7',
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: '59',
        start_date: '2012/08/06',
        salary: '$137,500',
      },
      {
        uuid: 'elem8',
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        age: '55',
        start_date: '2010/10/14',
        salary: '$327,900',
      },
      {
        uuid: 'elem9',
        name: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        age: '39',
        start_date: '2009/09/15',
        salary: '$205,500',
      },
    ];
    if (this.tableModel.getValue('options') === 'sorting') {
      table?.tableData?.sort((a, b) => {
        const valueA = Object.values(a)[0] as string | number;
        const valueB = Object.values(b)[0] as string | number;

        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
    }
    table.rowTemplate = this.rowTemplate;
    this.table = table;
    this.cdr.detectChanges();
  }

  getHeaderCss(extra?: boolean): string[] {
    if (extra) {
      return [
        'fw-bold',
        'fs-7',
        'text-gray-800',
        'border-bottom',
        'border-gray-200',
      ];
    }
    return ['fw-bold', 'fs-6', 'text-gray-800'];
  }

  onChanged(): void {
    this.startTable();
  }
}
