import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Asignatura } from 'src/app/models/Asignatura';
import { UserModel } from 'src/app/models/UserModel';
import { ClaseSeleccionada } from 'src/app/models/claseSeleccionada';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  qrCode: SafeResourceUrl | undefined;
  userInfoReceived!: Observable<UserModel>;
  userId!: "";
  users: any[] = [];
  clases: any[] = [];
  clase: Asignatura = {
    nombre: '',
    hora_ini: '',
    hora_ter: '',
    dia: '',
    profesor: ''
  }

  constructor(private router: Router, private _usuarioService: UserService,private _asignaturaservice: AsignaturaService) { 
  }

  ngOnInit() {
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);
    localStorage.setItem("user", this.userId);
    this.userInfoReceived = this._usuarioService.getUser(this.userId);
    this.getAllasignaturas();
  }
  generarClase(clase: Asignatura) {

    console.log(clase);
    const data = JSON.stringify(clase)|| 'DefaultDato'; // Usa el valor ingresado o un valor por defecto
    console.log(data);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
    this.qrCode = url
  }

  getAllasignaturas() {
    this._asignaturaservice.getAllAsignaturas().subscribe(
      (response: any) => {
        this.clases = response; // Asegúrate de que la respuesta sea un arreglo
        console.log(this.clases);
        this._usuarioService.getUserListSupaBase().subscribe(
          (respuesta: any) => {
            this.users = respuesta;
            for (let i = 0; i < this.clases.length; i++) {
              for (let x = 0; x < this.users.length; x++) {
                if (this.clases[i].profesor === this.users[x].id) {
                  this.clases[i].profesor = this.users[x].nombre;
                }
              }
            }
            console.log(this.clases);
          }
        );
      },
      (error) => {
        console.error('Error al obtener clases', error);
      }
    );
  }
}
