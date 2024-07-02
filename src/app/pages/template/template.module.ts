import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ElementsModule } from 'src/modules/elements/elements.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderToolbarComponent } from './header/header-toolbar/header-toolbar.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MobileMenuComponent } from './menus/mobile-menu/mobile-menu.component';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './header/header-toolbar/theme/theme.component';
import { AuthComponent } from './header/header-toolbar/auth/auth.component';

@NgModule({
  declarations: [
    SplashScreenComponent,
    HeaderComponent,
    FooterComponent,
    HeaderToolbarComponent,
    MenuComponent,
    MobileMenuComponent,
    ThemeComponent,
    AuthComponent,
  ],
  imports: [CommonModule, ElementsModule, RouterModule.forRoot([])],
  exports: [SplashScreenComponent, HeaderComponent, FooterComponent],
})
export class TemplateModule {}
