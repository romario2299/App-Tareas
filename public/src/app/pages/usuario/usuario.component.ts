import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NuevoUsuario } from 'src/app/models/usuario.model';
import { ConnectionAPIService } from 'src/app/services/connection-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  forma: FormGroup;
  usuario: NuevoUsuario;
  usuarioNoValido = false;

  constructor(private fb: FormBuilder, private servicio: ConnectionAPIService, private router: Router) { 
    this.crearFormulario();
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get passNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre : ['', [ Validators.required, Validators.minLength(3) ]],
      email : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      password : ['', [ Validators.required, Validators.minLength(5) ]]
    });
  }

  crearUsuario() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach( control => {
        control.markAsTouched();
      });
    } else {
      this.usuario = {
        nombre : this.forma.value['nombre'],
        email : this.forma.value['email'],
        password : this.forma.value['password']
      };

      this.servicio.crearUsuario(this.usuario).subscribe( data => {
        this.usuarioNoValido = false;
        this.router.navigate(['/tareas']);
      }, error => {
        this.usuarioNoValido = true;
      });
    }
  }

}
