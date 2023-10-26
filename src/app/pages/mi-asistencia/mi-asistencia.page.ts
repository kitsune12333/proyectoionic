import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { Observable, lastValueFrom} from 'rxjs';
import { AsistenciaModel } from 'src/app/models/AsistenciaModel';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-mi-asistencia',
  templateUrl: './mi-asistencia.page.html',
  styleUrls: ['./mi-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MiAsistenciaPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  
  message = 'Ingresar asistencia';
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
    let contador = 0;

while (true) {
  this._asistenciaService.getLastAsistenciaId(contador)

  if (contador === 5) {
    break; // Rompe el bucle cuando se cumple la condición
  }

  contador++;
}
    
    
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

  
insertarAsistencia(asistencia: AsistenciaModel) {
  asistencia.fecha = moment().format('YYYY/MM/DD HH:mm');
  console.log(asistencia.fecha);
  asistencia.usuario_asist = true;

  // Obtén el último id de asistencia desde la base de datos
  

    // Envía la solicitud POST con el objeto asistencia actualizado
    this._asistenciaService.postAsistencia(asistencia).subscribe(() => {
      this.modal.dismiss(null, 'confirm');
      this.getasistencias();
    });
  
}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `hecho, ${ev.detail.data}!`;
    }
  }

}