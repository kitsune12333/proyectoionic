import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserRegister } from 'src/app/models/UserRegister';
import { RegistroService } from 'src/app/services/registro.service';
import { lastValueFrom } from 'rxjs';
import { Observable, Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [RegistroService]
})
export class RegisterPage implements OnInit {

  userRegisterModal: UserRegister = {
    username:'',
    password:'',
    correo:'',
    telefono:'',
    tipoUsuario:'',
    nombre:'',
    tipoCarrera:''
  };

  constructor(private router: Router, private _registroService: RegistroService) { }

  ngOnInit() {
  }
  register(userRegisterModal: UserRegister){
    console.info(userRegisterModal)
    lastValueFrom(this._registroService.ingresarUsuario(userRegisterModal));
    this.router.navigate(['login'])
  }

}
