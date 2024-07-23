import { Component, OnInit } from '@angular/core';
import { IAppBreadcrumb } from 'src/app/interfaces/breadcrumbs';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  constructor(
    private pageService: PageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const breadcrumb: IAppBreadcrumb = {
      title: 'Blogs',
      items: [
        {
          label: 'Inicio',
          link: this.userService.getUser() ? '/inicio' : '/',
        },
        {
          label: 'Blogs',
        },
      ],
    };

    this.pageService.setBreadcrumb(breadcrumb);
  }
}
