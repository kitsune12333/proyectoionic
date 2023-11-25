import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/models/Asignatura';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [AsignaturaService]
})
export class AsistenciaPage implements OnInit {
  qrCode: SafeResourceUrl | undefined;
  dato: string = ''; // Agrega esta línea para inicializar la variable dato
  userInfoReceived!: Observable<UserModel>;
  asignaturaData: Asignatura = {
    nombre: '',
    hora_ini: '',
    hora_ter: '',
    dia: ''
  };
  constructor(private router: Router, private _usuarioService: UserService,private sanitizer: DomSanitizer,private asignaturaService: AsignaturaService) { 
    
  }

  ngOnInit() {
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    localStorage.setItem("user", userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
    this.asignaturaData = {
      nombre: '',
      hora_ini: '',
      hora_ter: '',
      dia: ''
    };
  }


  verAsistencia(){
    this.userInfoReceived.subscribe(
      {
        next: (user) => {
          console.log(user);
          if (user) {
            //EXISTE
            let userInfoSend: NavigationExtras = {
              state: {
                userInfo: user.id
              }
            }
            
            console.log(userInfoSend);
            if (user.tipoUsuario == 'profesor') {
              this.router.navigate(['mi-asistencia'], userInfoSend)
            }
          } else {
            //NO EXISTE
            console.log("Error de usuario...");
          }
        },
        error: (err) => {

        },
        complete: () => {

        }
      }
    )
  }
  generarClase() {
    const data = this.asignaturaData.nombre || 'DefaultDato'; // Usa el valor ingresado o un valor por defecto
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
    this.qrCode = url

    // Guarda la asignatura utilizando el servicio
    const asignaturaData = {
      nombre: 'Nombre de la asignatura',
      hora_ini: 'Hora de inicio',
      hora_ter: 'Hora de fin',
      dia: 'Día',
    };
    this.asignaturaService.guardarAsignatura(this.asignaturaData).subscribe(
      (asignaturaGuardada) => {
        console.log('Asignatura guardada con éxito:', asignaturaGuardada);
      },
      (error) => {
        console.error('Error al guardar la asignatura:', error);
      }
    );
  }
}
