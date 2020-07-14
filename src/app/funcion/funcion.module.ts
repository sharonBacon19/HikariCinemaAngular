import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionRoutingModule } from './funcion-routing.module';
import { FuncionIndexComponent } from './funcion-index/funcion-index.component';
import { FuncionShowComponent } from './funcion-show/funcion-show.component';


@NgModule({
  declarations: [FuncionIndexComponent, FuncionShowComponent],
  imports: [
    CommonModule,
    FuncionRoutingModule
  ]
})
export class FuncionModule { }
