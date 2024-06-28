import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlertsModel } from './alerts.model';
import { IAlert } from 'src/modules/elements/html/alert/alert';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

@Component({
  selector: 'app-bootstrap-documentation-html-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationAlertsComponent implements OnInit {
  srcCode!: string;
  alert!: IAlert;

  options!: IRadioList;

  constructor(public alertsModel: AlertsModel) {
    this.alertsModel.startForms();
  }

  ngOnInit(): void {
    this.options = this.alertsModel.getAlertOptions();
    this.getAlerts();
  }

  getAlerts() {
    const alert: IAlert = {
      title: this.alertsModel.getValue('title'),
      text: this.alertsModel.getValue('text'),
      css: [],
      titleCss: [],
      icon: {
        library: 'bi',
        value: 'bi-shield-x',
        css: ['fs-2hx', 'me-4'],
      },
    };

    if (this.alertsModel.getValue('color')) {
      if (this.alertsModel.getValue('alert') === 'solid') {
        alert.css?.push('bg-' + this.alertsModel.getValue('color'));
        alert.icon?.css?.push('text-white');
      } else if (this.alertsModel.getValue('alert') === 'light') {
        alert.css?.push('bg-light-' + this.alertsModel.getValue('color'));
        alert.icon?.css?.push('text-' + this.alertsModel.getValue('color'));
      } else {
        alert.css?.push('alert-' + this.alertsModel.getValue('color'));
        alert.icon?.css?.push('text-' + this.alertsModel.getValue('color'));
      }
    }
    if (this.alertsModel.getValue('alert') === 'dismissible') {
      alert.css?.push('alert-dismissible');
    }

    this.alert = alert;
    this.srcCode = '\nIAlert = ' + JSON.stringify(this.alert, null, 2);
  }

  onChanged() {
    this.getAlerts();
  }
}
