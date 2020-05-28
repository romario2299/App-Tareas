import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectionAPIService } from 'src/app/services/connection-api.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Output() usuario: EventEmitter<any>;

  forma: FormGroup;

  constructor( private fb: FormBuilder, private servicio: ConnectionAPIService) {
    this.usuario = new EventEmitter();
    this.crearFormulario();
  }

  crearFormulario() {
    let hoy = new Date().toISOString();
    const hoy1 = hoy.split(':', 2);
    hoy = hoy1.join(':');

    this.forma = this.fb.group({
      nombre : ['', [Validators.required]],
      prioridad : ['Alta', [Validators.required]],
      vencimiento : [hoy, [Validators.required]]
    });
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  crearTarea() {
    if (this.forma.invalid) {
      this.forma.controls['nombre'].markAsTouched();
    } else {
      this.servicio.crearTarea(this.forma.value).subscribe( data => {
        this.usuario.emit(data);
      });
    }
  }

}
