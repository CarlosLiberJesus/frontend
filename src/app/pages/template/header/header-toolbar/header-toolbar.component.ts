import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderToolbarComponent {}
