import { Component, OnInit } from '@angular/core';
import { IAppBreadcrumb } from 'src/app/lib/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrl: './biblioteca.component.scss',
})
export class BibliotecaComponent implements OnInit {
  constructor(
    private pageService: PageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const breadcrumb: IAppBreadcrumb = {
      title: 'Biblioteca',
      items: [
        {
          label: 'Inicio',
          link: this.userService.getUser() ? '/inicio' : '/',
        },
        {
          label: 'Biblioteca',
        },
      ],
    };

    this.pageService.setBreadcrumb(breadcrumb);
  }
}
