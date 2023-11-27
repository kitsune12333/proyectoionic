import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonModal, IonicModule } from '@ionic/angular';
import { NavigationExtras, Router} from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { Observable, lastValueFrom } from 'rxjs';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Asignatura } from 'src/app/models/Asignatura';
import { AsistenciaModel } from 'src/app/models/AsistenciaModel';
import * as moment from 'moment';
import { AsistenciaService } from 'src/app/services/asistencia.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  
  barcodes: Barcode[] = [];
  isSupported = false;
  rawclase!: string;
  clase: Asignatura = {
    nombre: '',
    hora_ini: '',
    hora_ter: '',
    dia: '',
    profesor: ''
  };
  asistencia: AsistenciaModel = {
    usuario_asist: true,
    id_user: '',
    fecha: '',
    materia: ''

  };
  @ViewChild(IonModal) modal!: IonModal;
  userInfoReceived!: Observable<UserModel>;
  userId: any;
  

  constructor(private alertController: AlertController, private router: Router, private _usuarioService: UserService, private _asistenciaservice: AsistenciaService) {
   }

   


  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);
    localStorage.setItem("user", this.userId);
    console.log(localStorage.getItem("user"));
    this.userInfoReceived = this._usuarioService.getUser(this.userId);
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    console.log(this.barcodes)
  }
  insertarAsistencia(asistencia: AsistenciaModel) {
    asistencia.id_user = this.userId;
    console.log(this.userId);
    asistencia.fecha = moment().format('YYYY/MM/DD HH:mm');
    console.log(asistencia.fecha);
    asistencia.usuario_asist = true;
    asistencia.materia = ""
    lastValueFrom(this._asistenciaservice.postAsistencia(asistencia));
  }
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  
cerrar(){
  localStorage.removeItem("user");
  this.router.navigate(['login'])
}
  miAsistencia(){
    console.log(this.userInfoReceived);
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
            console.log("Usuario existe...");
            console.log(userInfoSend);
            if (user.tipoUsuario == 'alumno') {
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

  registrarAsistencia(){
    console.log(this.userInfoReceived);
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
            console.log("Usuario existe...");
            console.log(userInfoSend);
            if (user.tipoUsuario == 'alumno') {
              this.router.navigate(['registrar-asistencia'], userInfoSend)
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

}


