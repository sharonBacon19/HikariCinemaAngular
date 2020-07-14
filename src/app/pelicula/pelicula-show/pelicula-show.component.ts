import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-show',
  templateUrl: './pelicula-show.component.html',
  styleUrls: ['./pelicula-show.component.css']
})
export class PeliculaShowComponent implements OnInit {
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
    this.obtenerPelicula(id);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
  //desinscribirse
    this.destroy$.unsubscribe();
  }

  obtenerPelicula(id:any){
    this.gService.get('pelicula', id).pipe(takeUntil(this.destroy$)).subscribe(
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
