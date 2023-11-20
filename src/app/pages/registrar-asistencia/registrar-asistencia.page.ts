import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, IonModal, IonicModule } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegistrarAsistenciaPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  @ViewChild(IonModal) modal!: IonModal;
  userInfoReceived!: Observable<UserModel>;
  
  constructor(private alertController: AlertController, private router: Router, private _usuarioService: UserService) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    localStorage.setItem("user", userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
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

}
