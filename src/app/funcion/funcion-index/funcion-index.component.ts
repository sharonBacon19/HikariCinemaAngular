import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-funcion-index',
  templateUrl: './funcion-index.component.html',
  styleUrls: ['./funcion-index.component.css']
})
export class FuncionIndexComponent implements OnInit {
  datos:any;
  error:any;
  destroy$:Subject<boolean>=new Subject<boolean>(); //quitar subscripción

   constructor(
     private gService:GenericService,
     private notificaction:NotificacionService
     ) {}

     //evento inicial
   ngOnInit(): void {
     //lógica para listar, se puede, pero mejor método por aparte
     this.listaFuncion();
   }

   ngOnDestroy(){
     this.destroy$.next(true);
   //desinscribirse
     this.destroy$.unsubscribe();
   }

   listaFuncion(){
     /*

     */
    this.gService
    .list('funcion/')
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data:any)=>{
       console.log(data);
        this.datos=data;
      },
      (error:any)=>{
        this.notificaction.mensaje(error.mensaje, error.name, 'error');
      }
    );
   }
}
