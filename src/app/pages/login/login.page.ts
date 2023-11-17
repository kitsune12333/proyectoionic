import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { IUserLogin } from 'src/app/models/IUserLogin';
import { Preferences } from '@capacitor/preferences';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf, ReactiveFormsModule ],
  providers: [UserService]
  
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;
  vacio: boolean = false;
  userLoginModal: IUserLogin = {
    correo: '',
    password: ''
  };

  

  
  constructor(private router: Router, private _usuarioService: UserService, private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  ngOnInit(): void {

  }

  setObject(user: string) {
   localStorage.setItem("user", user)
  }


  login() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      this.vacio = true;
      return;
    }
  
    // Continúa con la lógica de inicio de sesión
    this._usuarioService.getLoginUser(this.loginForm.value.correo, this.loginForm.value.password).subscribe(
      {
        next: (user) => {
          this.loginError = false;
          this.vacio = false;
          console.log(user);
          if (user) {
            //EXISTE
            let userInfoSend: NavigationExtras = {
              state: {
                userInfo: user.id
              }
            }
            console.log("Usuario existe...");
            console.log(localStorage.getItem("user"));
            this.setObject(user.id);
            console.log(localStorage.getItem("user"));
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
          console.error('Error en inicio de sesión', err);
          this.loginError = true;
        },
        complete: () => {
        }
      }
    );
  }

  register(){
    this.router.navigate(['register'])
  }

}
