import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAppBreadcrumb } from 'src/app/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  title = 'Bem vindos Libertários';
  local: boolean = environment.local;

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    const _breadcrumb: IAppBreadcrumb = {
      title: 'Ínicio',
      items: [
        {
          label: 'Libertarios',
        },
      ],
    };
    //this.pageService.setBreadcrumb(breadcrumb);
    this.pageService.hideSplashScreen();
  }
}
