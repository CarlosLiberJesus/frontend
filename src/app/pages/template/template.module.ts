import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderToolbarComponent } from './header/header-toolbar/header-toolbar.component';
import { MainMenuComponent } from './menus/main-menu/main-menu.component';
import { MobileMenuComponent } from './menus/mobile-menu/mobile-menu.component';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './header/header-toolbar/theme/theme.component';
import { AuthComponent } from './header/header-toolbar/auth/auth.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { AlertsComponent } from './tool-bar/alerts/alerts.component';
import { PageTitleComponent } from './tool-bar/page-title/page-title.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SplashScreenComponent,
    HeaderComponent,
    FooterComponent,
    HeaderToolbarComponent,
    MainMenuComponent,
    MobileMenuComponent,
    ThemeComponent,
    AuthComponent,
    ToolBarComponent,
    AlertsComponent,
    PageTitleComponent,
  ],
  imports: [
    CommonModule,
    ElementsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  exports: [
    SplashScreenComponent,
    HeaderComponent,
    ToolBarComponent,
    FooterComponent,
  ],
})
export class TemplateModule {}
