import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationComponent } from './dev-only/documentation/documentation.component';
import { DevGuard } from './lib/route-guard/dev.guard';
import { HomepageComponent } from './pages/public/homepage/homepage.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { LoggedInGuard } from './lib/route-guard/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Home',
  },
  {
    path: 'inicio',
    component: DashboardComponent,
    title: 'Ínicio',
    canActivate: [LoggedInGuard],
  },
  {
    path: 'documentacao',
    loadChildren: () =>
      import('./pages/public/documentacao/documentacao.module').then(
        m => m.DocumentacaoModule
      ),
  },
  {
    path: 'biblioteca',
    loadChildren: () =>
      import('./pages/public/biblioteca/biblioteca.module').then(
        m => m.BibliotecaModule
      ),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/public/blog/blog.module').then(m => m.BlogModule),
  },
  {
    path: 'eventos',
    loadChildren: () =>
      import('./pages/public/calendario/calendario.module').then(
        m => m.CalendarioModule
      ),
  },
  {
    path: 'libertario', // PARA páginas publicas, o homepage/blog da pessoa
    // perfil está na privadas, modulo libertarios
    loadChildren: () =>
      import('./pages/public/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'libertarios', // Privadas, modulo libertario
    loadChildren: () =>
      import('./pages/private/libertarios/libertarios.module').then(
        m => m.LibertariosModule
      ),
    canActivate: [LoggedInGuard],
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
