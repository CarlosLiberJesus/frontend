import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationComponent } from './dev-only/documentation/documentation.component';
import { DevGuard } from './lib/route-guard/dev.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Inicio',
  },
  {
    path: 'dev-only',
    component: DocumentationComponent,
    title: 'Documentação',
    canActivate: [DevGuard],
  },
  { path: '**', component: HomepageComponent }, // TODO or 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
