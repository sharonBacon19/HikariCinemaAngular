import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {
  datos:any;
  error:any;
  destroy$:Subject<boolean>=new Subject<boolean>(); //quitar subscripción

   constructor(
     private gService:GenericService,
     private notificaction:NotificacionService
     ) {}

     //evento inicial
   ngOnInit(): void {
     //lógica para listar videojuegos, se puede, pero mejor método por aparte
     this.listaProductos();
   }

   ngOnDestroy(){
     this.destroy$.next(true);
   //desinscribirse
     this.destroy$.unsubscribe();
   }

   listaProductos(){
     /*

     */
    this.gService
    .list('producto/')
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
