import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  private toolsSubject: BehaviorSubject<TemplateRef<HTMLElement> | null> =
    new BehaviorSubject<TemplateRef<HTMLElement> | null>(null);
  public tools$: Observable<TemplateRef<HTMLElement> | null> =
    this.toolsSubject.asObservable();

  setTools(tools: TemplateRef<HTMLElement> | null): void {
    this.toolsSubject.next(tools);
  }
}
