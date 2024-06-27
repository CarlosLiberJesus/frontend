import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HoverMessageModel } from './hover-message.model';
import { IPopOver } from 'src/modules/elements/base/pop-over/pop-over';
import { EEvent, EPosition } from 'src/modules/elements/elements';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-html-hover-message',
  templateUrl: './hover-message.component.html',
  styleUrls: ['./hover-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationHoverMessageComponent implements OnInit {
  srcCode!: string;
  popOver: IPopOver | null = null;

  typeOptions!: IRadioList;
  eventOptions!: IRadioList;
  positionOptions!: IRadioList;

  @ViewChild('target', { static: false }) targetElement!: ElementRef;

  constructor(
    public hoverMessageModel: HoverMessageModel,
    private cdr: ChangeDetectorRef
  ) {
    this.hoverMessageModel.startForms();
  }

  ngOnInit(): void {
    this.typeOptions = this.hoverMessageModel.getTypeOptions();
    this.eventOptions = this.hoverMessageModel.getEventOptions();
    this.positionOptions = this.hoverMessageModel.getPositionOptions();
    this.srcCode =
      '\nIPopOver = ' + JSON.stringify(this.getPopOverMessage(), null, 2);
  }

  setMessage(): void {
    this.popOver = this.getPopOverMessage();
    this.srcCode = '\nIPopOver = ' + JSON.stringify(this.popOver, null, 2);
  }

  getPopOverMessage(): IPopOver {
    //const _type = this.hoverMessageModel.getValue('type');
    const eventValue = this.hoverMessageModel.getValue('event');
    const positionValue = this.hoverMessageModel.getValue('position');

    const event: EEvent =
      EEvent.CLICK === eventValue ? EEvent.CLICK : EEvent.HOVER;
    let position: EPosition = EPosition.TOP;
    switch (positionValue) {
      case 'bottom':
        position = EPosition.BOTTOM;
        break;
      case 'left':
        position = EPosition.LEFT;
        break;
      case 'right':
        position = EPosition.RIGHT;
        break;
    }

    const popOver = {
      title: 'Título',
      content: 'E aqui está um conteúdo incrível. É muito envolvente. Certo?',
      even: event,
      position: position,
      cssContainer: ['fade show'],
    };
    return popOver;
  }

  onChange(): void {
    this.popOver = null;
    this.srcCode =
      '\nIPopOver = ' + JSON.stringify(this.getPopOverMessage(), null, 2);
  }

  clicked(): void {
    const eventValue = this.hoverMessageModel.getValue('event');
    if (eventValue === 'hover') {
      return;
    }
    if (this.popOver) {
      this.popOver = null;
    } else {
      this.setMessage();
    }
  }

  hoverEnter(): void {
    const eventValue = this.hoverMessageModel.getValue('event');
    if (eventValue !== 'hover') {
      return;
    }
    this.setMessage();
  }

  hoverLeave(): void {
    const eventValue = this.hoverMessageModel.getValue('event');
    if (eventValue !== 'hover') {
      return;
    }
    this.popOver = null;
  }
}
