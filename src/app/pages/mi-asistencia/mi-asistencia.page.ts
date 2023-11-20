import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { Observable, lastValueFrom } from 'rxjs';
import { AsistenciaModel } from 'src/app/models/AsistenciaModel';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';


@Component({
  selector: 'app-mi-asistencia',
  templateUrl: './mi-asistencia.page.html',
  styleUrls: ['./mi-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MiAsistenciaPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  @ViewChild(IonModal) modal!: IonModal;

  message = 'Ingresar asistencia';
  materia!: string;
  userInfoReceived!: Observable<UserModel>;
  userId!: "";
  users: any[] = [];
  asistencias: any[] = [];
  asistencia: AsistenciaModel = {
    usuario_asist: true,
    id_user: '',
    fecha: '',
    materia: ''

  };

  constructor(private alertController: AlertController, private router: Router, private _usuarioService: UserService, private _asistenciaService: AsistenciaService) {

  }
  
 
  
  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);
    localStorage.setItem("user", this.userId);
    this.userInfoReceived = this._usuarioService.getUser(this.userId);
    this.userInfoReceived.subscribe({
      next: (user) => {
        console.log(user);
        if (user) {
          //EXISTE
          let userInfoSend: NavigationExtras = {
            state: {
              userInfo: user.id
            }
          }
          console.log("Usuario existe...");
         
          console.log(userInfoSend);
          if (user.tipoUsuario == 'alumno') {
            this.getasistencias();
          }
          if (user.tipoUsuario == 'profesor') {
            this.getAllasistencias();
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


    })
  }

  

  getasistencias() {
    console.log(this.userId);
    this._asistenciaService.getAsistencia(this.userId).subscribe(
      (response: any) => {
        this.asistencias = response; // Asegúrate de que la respuesta sea un arreglo
        console.log(this.asistencias);
        for (let i = 0; i < this.asistencias.length; i++) {
          console.log(this.asistencias[i]); // Realiza la operación que desees con cada elemento de this.asistencias
          this.userInfoReceived.subscribe({
            next: (user) => {
              if (user.id == this.asistencias[i].id_user) {
                this.asistencias[i].id_user = user.nombre
              }
            },

          })
        }
      },
      (error) => {
        console.error('Error al obtener asistencias', error);
      }
    );
  }

  getAllasistencias() {
    this._asistenciaService.getAllAsistencia().subscribe(
      (response: any) => {
        this.asistencias = response; // Asegúrate de que la respuesta sea un arreglo
        console.log(this.asistencias);
        this._usuarioService.getUserListSupaBase().subscribe(
          (respuesta: any) => {
            this.users = respuesta;
            for (let i = 0; i < this.asistencias.length; i++) {
              for (let x = 0; x < this.users.length; x++) {
                if (this.asistencias[i].id_user === this.users[x].id) {
                  this.asistencias[i].id_user = this.users[x].nombre;
                }
              }
            }
            console.log(this.asistencias);
          }
        );
      },
      (error) => {
        console.error('Error al obtener asistencias', error);
      }
    );
  }
  



  insertarAsistencia(asistencia: AsistenciaModel) {
    asistencia.id_user = this.userId;
    console.log(this.userId);
    asistencia.fecha = moment().format('YYYY/MM/DD HH:mm');
    console.log(asistencia.fecha);
    asistencia.usuario_asist = true;
    this.modal.dismiss(this.materia, 'confirm');
    lastValueFrom(this._asistenciaService.postAsistencia(asistencia));
    this.getasistencias();
    
    
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