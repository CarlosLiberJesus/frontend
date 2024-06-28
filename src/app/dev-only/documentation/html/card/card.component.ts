import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardModel } from './card.model';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-html-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationCardComponent implements OnInit {
  srcCode!: string;
  toggle = true;
  visible = true;

  cardOptions!: ICheckBoxList;
  borderOptions!: IRadioList;
  shadowOptions!: IRadioList;
  ribbonOptions!: ICheckBoxList;
  ribbonPositionOptions!: IRadioList;

  constructor(public cardModel: CardModel) {
    this.cardModel.startForms();
  }

  ngOnInit(): void {
    this.cardOptions = this.cardModel.getCardOptions();
    this.borderOptions = this.cardModel.getBorderOptions();
    this.shadowOptions = this.cardModel.getShadowOptions();
    this.ribbonOptions = this.cardModel.getRibbonOptions();
    this.ribbonPositionOptions = this.cardModel.getRibbonPositionOptions();
    this.generateCode();
  }

  generateCode(): void {
    const classesCard = this.getClassesCard();
    const options = this.cardModel.getFormArrayValue('options');
    const header = this.cardModel.getValue('header');
    const toolbarTranslation = 'Acções';
    const body = this.cardModel.getValue('body');
    const footer = this.cardModel.getValue('footer');

    let cardHtml = `
    <div class="${classesCard}">
  `;

    if (options.includes('header')) {
      cardHtml += `
      <div class="${this.getClassesHeader()}">
    `;
      if (options.includes('ribbon')) {
        cardHtml += `
        <div class="${this.getClassesRibbon()}">
      `;
        if (this.cardModel.getValue('ribbonToggle')) {
          cardHtml += `      <i class="fa-regular fa-chess-pawn text-white fs-1"></i>`;
        } else {
          cardHtml += `      Fita`;
          if (
            this.cardModel.getFormArrayValue('ribbonOptions').includes('clip')
          ) {
            cardHtml += `
            <span class="${this.getClassesRibbonInner()}"></span>`;
          }
        }

        cardHtml += `
        </div>
      `;
      }
      cardHtml += `
        <h3 class="card-title">${header}</h3>
    `;
      if (options.includes('action')) {
        cardHtml += `
        <div class="${this.getClassesToolbar()}">
      `;
        if (options.includes('collapse')) {
          cardHtml += `
          <i class="fa-solid fa-angle-down fs-1"></i>
        `;
        } else if (options.includes('removable')) {
          cardHtml += `
          <i class="bi bi-x fs-1"></i>
        `;
        } else {
          cardHtml += `
          <button type="button" class="btn btn-sm btn-light">${toolbarTranslation}</button>
        `;
        }
        cardHtml += `
        </div>
      `;
      }
      cardHtml += `
      </div>
    `;
    }

    if (options.includes('collapse')) {
      cardHtml += `
      <div class="collapse show">
        <div class="${this.getClassesBody()}">${body}</div>
    `;
      if (options.includes('footer')) {
        cardHtml += `
        <div class="card-footer">${footer}</div>
      `;
      }
      cardHtml += `
      </div>
    `;
    } else {
      cardHtml += `
      <div class="${this.getClassesBody()}">${body}</div>
    `;
      if (options.includes('footer')) {
        cardHtml += `
        <div class="card-footer">${footer}</div>
      `;
      }
    }

    cardHtml += `
    </div>
  `;

    this.srcCode = cardHtml;
  }

  getClassesCard(): string {
    let card = 'card';
    card += ' ' + this.cardModel.getValue('border');
    if (
      this.cardModel.getFormArrayValue('options').includes('shadow') &&
      this.cardModel.getValue('shadow') !== 'none'
    ) {
      card += ' shadow-' + this.cardModel.getValue('shadow');
    }
    if (this.cardModel.getFormArrayValue('options').includes('padding')) {
      card += ' card-px-0 card-py-0';
    }
    return card;
  }

  getClassesHeader(): string {
    let headerCss = 'card-header';
    if (this.cardModel.getFormArrayValue('options').includes('collapse')) {
      headerCss +=
        ' card-header collapsible cursor-pointer rotate ' +
        (this.toggle ? 'active' : 'collapsed');
    }
    if (this.cardModel.getFormArrayValue('options').includes('ribbon')) {
      headerCss +=
        ' ribbon ribbon-' + this.cardModel.getValue('ribbonPosition');
      if (
        this.cardModel.getFormArrayValue('ribbonOptions').includes('vertical')
      ) {
        headerCss += ' ribbon-vertical';
      }
      if (this.cardModel.getFormArrayValue('ribbonOptions').includes('clip')) {
        headerCss += ' ribbon-clip';
      }
    }
    return headerCss;
  }

  getClassesRibbon(): string {
    let ribbon = 'ribbon-label';
    if (!this.cardModel.getFormArrayValue('ribbonOptions').includes('clip')) {
      if (this.cardModel.getValue('color')) {
        ribbon += ' bg-' + this.cardModel.getValue('color');
      }
    }
    return ribbon;
  }

  getClassesRibbonInner(): string {
    let ribbon = 'ribbon-inner';
    if (this.cardModel.getValue('color')) {
      ribbon += ' bg-' + this.cardModel.getValue('color');
    }
    return ribbon;
  }

  getClassesBody(): string {
    let body = 'card-body';
    if (this.cardModel.getFormArrayValue('options').includes('scroollbar')) {
      body += ' card-scroll h-200px';
    }
    return body;
  }

  getClassesToolbar(): string {
    let toolbar = 'card-toolbar';
    if (this.cardModel.getFormArrayValue('options').includes('collapse')) {
      toolbar += ' rotate-180';
    }
    return toolbar;
  }

  destroy(): void {
    this.visible = false;
  }
  onChanged(): void {
    this.visible = true;
    this.generateCode();
  }
}
