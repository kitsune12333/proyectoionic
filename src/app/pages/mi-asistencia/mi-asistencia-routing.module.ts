import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiAsistenciaPage } from './mi-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: MiAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiAsistenciaPageRoutingModule {}
