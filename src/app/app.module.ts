import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentationModule } from './dev-only/documentation/documentation.module';
import { HomepageComponent } from './pages/public/homepage/homepage.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { TemplateModule } from './pages/template/template.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { ApiHttpInterceptor } from './lib/route-guards/http.interceptor';
import { LibKanbanModule } from '@carlosliberjesus/licenced-lib';
import { CalendarComponent } from './pages/private/dashboard/calendar/calendar.component';

@NgModule({
  // todo... reduziz as componentes
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DocumentationModule,
    ElementsModule,
    TemplateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LibKanbanModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
