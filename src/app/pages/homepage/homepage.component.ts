import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
    this.pageService.setBreadcrumb(null);
  }
}
