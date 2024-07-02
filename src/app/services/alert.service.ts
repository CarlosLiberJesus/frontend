import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAppAlert } from '../interfaces/app-alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject: Subject<IAppAlert | undefined> = new Subject<
    IAppAlert | undefined
  >();

  setAlert(alert: IAppAlert | undefined): void {
    this.alertSubject.next(alert);
  }

  getAlert(): Observable<IAppAlert | undefined> {
    return this.alertSubject.asObservable();
  }
}
