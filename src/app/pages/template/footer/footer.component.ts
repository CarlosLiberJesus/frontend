import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { IButton } from 'src/modules/elements/html/button/button';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  local: boolean = environment.local;

  documentationButton: IButton = {
    text: 'Documentação',
    css: ['btn', 'btn-capan'],
  };

  constructor(private router: Router) {}

  openDocumentation(): void {
    this.router.navigate(['/dev-only']);
  }
}
