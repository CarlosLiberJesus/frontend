import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro.component';
import { BaseModule } from 'src/modules/elements/base/base.module';
import { FormModule } from 'src/modules/elements/forms/form.module';
import { HtmlModule } from 'src/modules/elements/html/html.module';
import { CodeHighlightModule } from '../code-highlight/code-highlight.module';
import { DocumentationAnimationsComponent } from './animations/animations.component';
import { AnimationsModel } from './animations/animations.model';
import { DocumentationBordersComponent } from './borders/borders.component';
import { BordersModel } from './borders/borders.model';
import { DocumentationColorsComponent } from './colors/colors.component';
import { ColorsModel } from './colors/colors.model';
import { DocumentationFontsComponent } from './fonts/fonts.component';
import { FontsModel } from './fonts/fonts.model';
import { DocumentationGridComponent } from './grid/grid.component';
import { DocumentationSizesComponent } from './sizes/sizes.component';
import { SizesModel } from './sizes/sizes.model';
import { DocumentationIconsComponent } from './icons/icons.component';
import { IconsModel } from './icons/icons.model';
import { NavigationModule } from 'src/modules/elements/navigation/navigation.module';

@NgModule({
  declarations: [
    IntroComponent,
    DocumentationAnimationsComponent,
    DocumentationBordersComponent,
    DocumentationColorsComponent,
    DocumentationFontsComponent,
    DocumentationGridComponent,
    DocumentationSizesComponent,
    DocumentationIconsComponent,
  ],
  imports: [
    CommonModule,
    FormModule,
    HtmlModule,
    BaseModule,
    NavigationModule,
    CodeHighlightModule,
  ],
  providers: [
    AnimationsModel,
    BordersModel,
    ColorsModel,
    FontsModel,
    SizesModel,
    IconsModel,
  ],
  exports: [IntroComponent],
})
export class DocumentationIntroModule {}
