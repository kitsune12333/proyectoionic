import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisClasesPage } from './mis-clases.page';

const routes: Routes = [
  {
    path: '',
    component: MisClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisClasesPageRoutingModule {}
