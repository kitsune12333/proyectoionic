import { Component, OnInit } from '@angular/core';
import { ClaseRegister } from 'src/app/models/ClaseRegister';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
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

  }
}
