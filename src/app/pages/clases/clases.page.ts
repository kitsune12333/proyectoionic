import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClaseRegister } from 'src/app/models/ClaseRegister';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  loginError: boolean = false;
  creada: boolean = false;
  userRegisterModal: ClaseRegister = {
    nombre: '',
    hora_inicio: '',
    hora_termino: '',
    dia: '',
  };
  constructor() { }

  ngOnInit() {
  }
  crearClase(){
    this._registroService.postAsigntura(this.userRegisterModal).subscribe({
      complete: () => {
        this.creada = true;
      },
      error: (err) => {
        console.error('Error al registrar', err);
      }
    })
  }
}
