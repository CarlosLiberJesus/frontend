import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Bem vindos Libertários';
  local: boolean = environment.local;

  constructor(private router: Router) {}

  redirectToNewPage() {
    this.router.navigate(['/dev-only']); // Replace 'new-page' with the route of your new page
  }
}
