import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class ConnectionAPIService {

  urlUsuario = 'http://localhost:3000/usuario';
  urlNuevoUsuario = 'http://localhost:3000/nuevoUsuario';
  urlTareas = 'http://localhost:3000/tareas';
  token = '';

  constructor( private http: HttpClient) { }

  validarUsuario(usuario: Usuario) {
    return this.http.post(this.urlUsuario, usuario).pipe( map( data => {
      this.guardarToken(data['auth']);
      return data['usuario']
    }));
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.urlNuevoUsuario, usuario).pipe( map( data => {
      this.guardarToken(data['auth']);
      return data['usuario']
    }));
  }

  obtenerUsuarioTareas() {
    let auxToken = this.leerToken();
    let headers = new HttpHeaders().set('auth', auxToken);
    return this.http.get(this.urlTareas, {headers : headers}).pipe( map( data => {
      return data['usuario']
    }));
  }

  crearTarea(tarea: any) {
    const auxToken = this.leerToken();
    const headers = new HttpHeaders().set('auth', auxToken);
    return this.http.post(this.urlTareas, tarea, {headers}).pipe( map( data => {
      return data['usuario'];
    }));
  }

  eliminarTarea(id: any) {
    const auxToken = this.leerToken();
    const headers = new HttpHeaders().set('auth', auxToken);
    return this.http.delete(`${this.urlTareas}?id=${id}`, {headers}).pipe( map( data => {
      return data['usuario']
    }));
  }

  editarTarea(tarea: any) {
    const auxToken = this.leerToken();
    const headers = new HttpHeaders().set('auth', auxToken);
    return this.http.put(this.urlTareas, tarea, {headers}).pipe( map( data => {
      return data['usuario'];
    }));
  }

  private guardarToken( token: string ) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private leerToken() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

  autenticado(): boolean {
    const auxToken = this.leerToken();
    return auxToken.length > 2;
  }

  cerrarSesion() {
    this.guardarToken('');
  }

}
