import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationComponent } from './dev-only/documentation/documentation.component';
import { DevGuard } from './lib/route-guards/dev.guard';
import { HomepageComponent } from './pages/public/homepage/homepage.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { LoggedInGuard } from './lib/route-guards/logged.guard';

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
    path: 'blogs',
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
    path: 'libertario', // PARA páginas publicas blog da pessoa
    loadChildren: () =>
      import('./pages/public/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'libertarios', // Privadas, modulo libertarios
    loadChildren: () =>
      import('./pages/private/libertarios/libertarios.module').then(
        m => m.LibertariosModule
      ),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'tarefas', // Privadas, modulo libertarios
    loadChildren: () =>
      import('./pages/private/tarefas/tarefas.module').then(
        m => m.TarefasModule
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
