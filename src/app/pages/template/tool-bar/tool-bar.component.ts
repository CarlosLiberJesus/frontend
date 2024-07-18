import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-layout-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  tools!: TemplateRef<HTMLElement> | null;

  constructor(
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.toolsService.tools$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tools: TemplateRef<HTMLElement> | null) => {
        this.tools = tools;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
