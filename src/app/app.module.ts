import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentationModule } from './dev-only/documentation/documentation.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { TemplateModule } from './pages/template/template.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DocumentationModule,
    ElementsModule,
    TemplateModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
