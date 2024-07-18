import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { routeTransition } from './lib/route-transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransition],
})
export class AppComponent {
  title = 'Bem vindos Libertários';
  local: boolean = environment.local;

  constructor(
    private router: Router,
    protected route: ActivatedRoute
  ) {}

  redirectToNewPage() {
    this.router.navigate(['/dev-only']); // Replace 'new-page' with the route of your new page
  }
}
