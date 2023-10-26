import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { AsistenciaModel } from 'src/app/models/AsistenciaModel';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-mi-asistencia',
  templateUrl: './mi-asistencia.page.html',
  styleUrls: ['./mi-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MiAsistenciaPage implements OnInit {

  userInfoReceived: Observable<UserModel>;
  userId: "";
  asistencias: any[] = [];
  asistencia: AsistenciaModel = {
    id: 0,
    usuario_asist: true,
    id_user: 0,
    fecha: '',
    materia: '',

  };

  constructor(private router: Router, private _usuarioService: UserService, private _asistenciaService: AsistenciaService) {
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);
    this.userInfoReceived = this._usuarioService.getUser(this.userId);
    console.log(this.userInfoReceived);
    
    
    
   }

  ngOnInit() {
    this.getasistencias();
  }

  getasistencias() {
    this._asistenciaService.getAsistencia(this.userId).subscribe(
      (response: any) => {
        this.asistencias = response; // Asegúrate de que la respuesta sea un arreglo
        console.log(this.asistencias);
      },
      (error) => {
        console.error('Error al obtener asistencias', error);
      }
    );
  }
}