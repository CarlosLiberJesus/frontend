import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { environment } from 'src/environments/environment';
import { ISpinner } from 'src/modules/elements/html/spinner/spinner';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  title = 'Bem vindos Libertários';
  local: boolean = environment.local;

  step: string = 'hidden';

  spinner: ISpinner = {
    name: 'spinner',
    animation: {
      icon: {
        library: 'bi',
        value: 'bi-arrow-down-short',
        css: ['fs-2x'],
      },
      css: [
        'animate__animated animate__bounce animate__slow animate__infinite',
      ],
    },
  };

  constructor(
    private pageService: PageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pageService.setBreadcrumb(null);
    this.startAnimations();
    //this.setStep('third-enterance');
    //this.cdr.detectChanges();
  }

  setStep(step: string): void {
    this.step = step;
  }

  startAnimations(): void {
    setTimeout(() => {
      this.setStep('first-enterance');
      this.cdr.detectChanges();

      setTimeout(() => {
        // esperou 3s
        this.setStep('first-exit');
        this.cdr.detectChanges();

        setTimeout(() => {
          // esperou 1s

          this.setStep('second-enterance');
          this.cdr.detectChanges();
          setTimeout(() => {
            // esperou 3s

            this.setStep('second-exit');
            this.cdr.detectChanges();

            setTimeout(() => {
              // esperou 1s
              this.setStep('third-enterance');
              this.cdr.detectChanges();
            }, 1000);
          }, 2500);
        }, 1000);
      }, 2500);
    }, 1000);
  }

  scrollToNextSection() {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
