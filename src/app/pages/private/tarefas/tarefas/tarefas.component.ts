import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarefasComponent {}
