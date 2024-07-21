import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ArtigoComponent } from './artigo/artigo.component';

@NgModule({
  declarations: [BlogComponent, ArtigoComponent],
  imports: [CommonModule, BlogRoutingModule],
})
export class BlogModule {}
