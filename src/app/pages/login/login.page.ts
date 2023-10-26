import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { IUserLogin } from 'src/app/models/IUserLogin';
import { Observable, Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
  
})
export class LoginPage implements OnInit, OnDestroy {

  userLoginModal: IUserLogin = {
    correo: '',
    password: ''
  };

  

  
  constructor(private router: Router, private _usuarioService: UserService) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }

  setObject(user: UserModel) {
   Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  login(userLoginInfo: IUserLogin) {
    this._usuarioService.getLoginUser(userLoginInfo.correo, userLoginInfo.password).subscribe(
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
            this.setObject(user);
            console.log(userInfoSend);
            if (user.tipoUsuario == 'alumno') {
              this.router.navigate(['home'], userInfoSend)
            }if (user.tipoUsuario == 'profesor') {
              this.router.navigate(['home-profe'], userInfoSend)
            }else{
              this.router.navigate(['home'], userInfoSend)
            }
          } else {
            //NO EXISTE
            console.log("Usuario no existe...");
          }
        },
        error: (err) => {

        },
        complete: () => {

        }
      }
    )
  }


  register(){
    this.router.navigate(['register'])
  }

}
