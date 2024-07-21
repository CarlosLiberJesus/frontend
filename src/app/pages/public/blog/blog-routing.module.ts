import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { ArtigoComponent } from './artigo/artigo.component';

const blogRoutes: Routes = [
  { path: '', component: BlogComponent },
  { path: ':id', component: ArtigoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
