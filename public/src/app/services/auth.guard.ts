import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectionAPIService } from './connection-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private servicio: ConnectionAPIService, private router: Router) {}

  canActivate(): boolean {
    if ( this.servicio.autenticado() ){
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
