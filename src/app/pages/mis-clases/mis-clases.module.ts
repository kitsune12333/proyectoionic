import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisClasesPageRoutingModule } from './mis-clases-routing.module';

import { MisClasesPage } from './mis-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisClasesPageRoutingModule
  ],
  declarations: [MisClasesPage]
})
export class MisClasesPageModule {}
