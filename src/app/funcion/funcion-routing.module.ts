import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionIndexComponent } from './funcion-index/funcion-index.component';
import { FuncionShowComponent } from './funcion-show/funcion-show.component';

const routes: Routes = [
  { path: 'funcion', component: FuncionIndexComponent},
  { path: 'funcion/:id', component: FuncionShowComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionRoutingModule { }
