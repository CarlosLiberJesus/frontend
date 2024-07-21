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
import { ApiHttpInterceptor } from './lib/http.interceptor';

@NgModule({
  declarations: [AppComponent, HomepageComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DocumentationModule,
    ElementsModule,
    TemplateModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
