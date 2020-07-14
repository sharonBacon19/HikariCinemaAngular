import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-producto-show',
  templateUrl: './producto-show.component.html',
  styleUrls: ['./producto-show.component.css']
})
export class ProductoShowComponent implements OnInit {
  datos:any;
  error:any;
  destroy$:Subject<boolean>=new Subject<boolean>(); //quitar subscripción

  constructor(
    private gService:GenericService,
    private notificaction:NotificacionService,
    private route:ActivatedRoute
    ) {}

  ngOnInit(): void {
    //OBTENER ID DEL VIDEOJUEGO
    let id=+this.route.snapshot.paramMap.get('id');
    //obtener 1 videojuego
    this.obtenerProducto(id);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
  //desinscribirse
    this.destroy$.unsubscribe();
  }

  obtenerProducto(id:any){
    this.gService.get('producto', id).pipe(takeUntil(this.destroy$)).subscribe(
      (data:any)=>{
       // console.log(data);
         this.datos=data;
       },
       (error:any)=>{
         this.notificaction.mensaje(error.mensaje, error.name, 'error');
       }
    );
  }
}
