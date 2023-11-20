import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './logueo/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-profe',
    loadChildren: () => import('./pages/home-profe/home-profe.module').then( m => m.HomeProfePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-asistencia',
    loadChildren: () => import('./pages/lista-asistencia/lista-asistencia.module').then( m => m.ListaAsistenciaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mi-asistencia',
    loadChildren: () => import('./pages/mi-asistencia/mi-asistencia.module').then( m => m.MiAsistenciaPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
