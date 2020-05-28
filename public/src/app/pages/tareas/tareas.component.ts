import { Component } from '@angular/core';
import { ConnectionAPIService } from '../../services/connection-api.service';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

registerLocaleData(localEs);

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {

  usuario: any;

  show = false;
  showTable = false;
  edit: boolean[] = [];
  tareasParaHoy_ : any[] = [];

  constructor( private servicio: ConnectionAPIService, private router: Router) {

    servicio.obtenerUsuarioTareas().subscribe( data => {
      this.usuario = data;
      this.show = true;
      if (data['tareas'].length === 0) {
        this.showTable = false;
      } else {
        this.showTable = true;
        this.edit.length = data['tareas'].length;
        this.edit.fill(false);
      }
      this.tareasParaHoy();
      this.organizarTareas();
    });
  }

  eliminarTarea(id: any) {
    this.servicio.eliminarTarea(id).subscribe( data => {
      this.usuario = data;
      if (data['tareas'].length === 0) {
        this.showTable = false;
      } else {
        this.showTable = true;
        this.edit.length = data['tareas'].length;
        this.edit.fill(false);
      }
      this.organizarTareas();
    });
  }

  editarTarea(id: any, i: any) {
    this.edit[i] = false;
    this.servicio.editarTarea(this.usuario.tareas[i]).subscribe( data => {
      this.usuario = data;
      this.organizarTareas();
    });
  }

  cambiarAEdicion(index: any) {
    this.edit[index] = !this.edit[index];
  }

  mostrarTareaCreada(e: any) {
    this.usuario = e;
    this.showTable = true;
    this.organizarTareas();
  }

  cerrarSesion() {
    this.router.navigate(['/home']);
    this.servicio.cerrarSesion();
  }

  tareasParaHoy() {
    this.organizarTareas();
    const hoy = new Date();
    this.usuario.tareas.forEach( tarea => {
      let fechaTarea: any = Date.parse(tarea.vencimiento);
      fechaTarea = new Date(fechaTarea);

      if ( hoy.getFullYear() === fechaTarea.getFullYear() &&
           hoy.getDate() === fechaTarea.getDate() &&
           hoy.getDay() === fechaTarea.getDay() ) {
        this.tareasParaHoy_.push(tarea.nombre);
      }
    });
    let tareas: string;
    let titulo: string;
    if (this.tareasParaHoy_.length > 0 ) {
      tareas = this.tareasParaHoy_.join('<br>').toString();
      titulo = 'Tus tareas de hoy!';
    } else {
      titulo = 'No tienes tareas para hoy';
      tareas = '';
    }
    Swal.fire({
      title: titulo,
      html: tareas,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  }

  organizarTareas() {
    this.usuario.tareas.sort( (a, b) => {
      const fecha1 = new Date(a.vencimiento).getTime();
      const fecha2 = new Date(b.vencimiento).getTime();
      return (fecha1 - fecha2);
    });
  }

}
