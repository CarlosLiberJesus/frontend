import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IBullets } from 'src/modules/elements/html/bullets/bullets';
import { BulletsModel } from './bullets.model';

@Component({
  selector: 'app-bootstrap-documentation-html-bullets',
  templateUrl: './bullets.component.html',
  styleUrls: ['./bullets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationBulletsComponent {
  bullets!: IBullets;
  srcCode!: string;

  constructor(public bulletsModel: BulletsModel) {
    this.bulletsModel.startForms();
    this.getBullets();
  }

  getBullets() {
    this.bullets = {
      cssContainer: ['d-flex', 'flex-column'], // TODO can also be flex-row'
      cssLi: ['d-flex', 'align-items-center', 'py-2'],
      bullets: [
        {
          text: 'Elem 1',
          css: [
            'me-5',
            this.bulletsModel.getValue('color')
              ? 'bg-' + this.bulletsModel.getValue('color')
              : '',
            this.bulletsModel.getValue('style')
              ? '' + this.bulletsModel.getValue('style')
              : '',
            this.bulletsModel.getValue('size')
              ? this.bulletsModel.getSizeOptions().valuesList[
                  +(this.bulletsModel.getValue('size') ?? 0)
                ]
              : '',
          ].filter(Boolean),
        },
        {
          text: 'Elem 2',
          css: [
            'me-5',
            this.bulletsModel.getValue('color')
              ? 'bg-' + this.bulletsModel.getValue('color')
              : '',
            this.bulletsModel.getValue('style')
              ? '' + this.bulletsModel.getValue('style')
              : '',
            this.bulletsModel.getValue('size')
              ? this.bulletsModel.getSizeOptions().valuesList[
                  +(this.bulletsModel.getValue('size') ?? 0)
                ]
              : '',
          ].filter(Boolean),
        },
        {
          text: 'Elem 3',
          css: [
            'me-5',
            this.bulletsModel.getValue('color')
              ? 'bg-' + this.bulletsModel.getValue('color')
              : '',
            this.bulletsModel.getValue('style')
              ? '' + this.bulletsModel.getValue('style')
              : '',
            this.bulletsModel.getValue('size')
              ? this.bulletsModel.getSizeOptions().valuesList[
                  +(this.bulletsModel.getValue('size') ?? 0)
                ]
              : '',
          ].filter(Boolean),
        },
      ],
    };

    this.srcCode = '\nIBullets = ' + JSON.stringify(this.bullets, null, 2);
  }

  onChange(): void {
    this.getBullets();
  }
}
