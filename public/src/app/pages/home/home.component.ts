import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectionAPIService } from '../../services/connection-api.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  forma: FormGroup;
  usuario: Usuario;
  usuarioNoValido = false;

  constructor(private fb: FormBuilder, private servicio: ConnectionAPIService, private router: Router) { 
    this.crearFormulario();
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get passNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      email : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      password : ['', [ Validators.required, Validators.minLength(5) ]]
    });
  }

  validarUsuario() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.usuario = {
        email : this.forma.value['email'],
        password : this.forma.value['password']
      };
      this.servicio.validarUsuario(this.usuario).subscribe( data => {
        this.usuarioNoValido = false;
        this.router.navigate(['/tareas1']);
      }, error => {
        this.usuarioNoValido = true;
      });
    }
  }

}
