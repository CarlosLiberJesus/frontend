import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { routeTransition } from './lib/route-guards/route-transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransition],
})
export class AppComponent implements AfterViewInit {
  title = 'Bem vindos Libertários';
  local: boolean = environment.local;

  //TODO o prettier consegue só os do git, não todos?
  constructor(
    private router: Router,
    protected route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    const scrolltop: HTMLElement | null = document.querySelector('.scrolltop');

    if (scrolltop) {
      // Add scroll event listener to the window
      window.addEventListener('scroll', function () {
        // Check if the user has scrolled down more than 200 pixels
        if (window.scrollY > 200) {
          // Show the scrolltop element
          scrolltop.style.display = 'flex';
          scrolltop.style.opacity = '0.5';
        } else {
          // Hide the scrolltop element
          scrolltop.style.display = 'none';
          scrolltop.style.opacity = '0';
        }
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  redirectToNewPage() {
    this.router.navigate(['/dev-only']); // Replace 'new-page' with the route of your new page
  }
}
