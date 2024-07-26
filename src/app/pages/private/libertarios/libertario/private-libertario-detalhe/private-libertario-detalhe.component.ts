import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IUser } from 'src/app/lib/interfaces/user';
import { IButton } from 'src/modules/elements/html/button/button';

@Component({
  selector: 'app-private-libertario-detalhe',
  templateUrl: './private-libertario-detalhe.component.html',
  styleUrl: './private-libertario-detalhe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLibertarioDetalheComponent {
  @Input() user!: IUser;
  @Output() edit = new EventEmitter<boolean>();

  editButton: IButton = {
    text: 'Editar',
    css: ['btn-capan', 'd-flex'],
    iconLast: {
      library: 'bi',
      value: 'bi-person-gear',
      css: ['fs-2', 'ms-2'],
    },
  };

  constructor() {}

  onEdit() {
    this.edit.emit(true);
  }
}
