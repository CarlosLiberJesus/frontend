import { Component, OnInit } from '@angular/core';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit {
  constructor(
    private pageService: PageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const breadcrumb: IAppBreadcrumb = {
      title: 'Calendário',
      items: [
        {
          label: 'Inicio',
          link: this.userService.getUser() ? '/inicio' : '/',
        },
        {
          label: 'Calendário',
        },
      ],
    };

    this.pageService.setBreadcrumb(breadcrumb);
  }
}
