import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UserRegister } from 'src/app/models/UserRegister';
import { RegistroService } from 'src/app/services/registro.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, HttpClientModule, NgFor, NgForOf, ReactiveFormsModule],
  providers: [RegistroService, UserService]
})
export class RegisterPage implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;
  contraError: boolean = false;
  userError: boolean = false;
  userRegisterModal: UserRegister = {
    username: '',
    password: '',
    correo: '',
    telefono: '',
    tipoUsuario: '',
    nombre: '',
    tipoCarrera: ''
  };

  constructor(private router: Router, private _registroService: RegistroService, private formBuilder: FormBuilder, private _userService: UserService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordC: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("^((\\+569-?)|0)?[0-9]{8}$")]], // Validación básica para números de teléfono en formato local de 10 dígitos
      tipoUsuario: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tipoCarrera: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  register() {
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      this.loginError = true;
      return;
    }
    if (this.loginForm.value.password === this.loginForm.value.passwordC) {
      this._userService.getUserConfirm(this.loginForm.value.correo , this.loginForm.value.username).subscribe({
        complete: () => {
          console.log('correo o usuario tomado');
          this.userError = true;
        },
        error: () => {
          console.log('formulario valido');
          this.userRegisterModal.username = this.loginForm.value.username;
    this.userRegisterModal.password = this.loginForm.value.password;
    this.userRegisterModal.correo = this.loginForm.value.correo;
    this.userRegisterModal.telefono = this.loginForm.value.telefono;
    this.userRegisterModal.tipoUsuario = this.loginForm.value.tipoUsuario;
    this.userRegisterModal.nombre = this.loginForm.value.nombre;
    this.userRegisterModal.tipoCarrera = this.loginForm.value.tipoCarrera;
    console.info(this.userRegisterModal)
    this._registroService.ingresarUsuario(this.userRegisterModal).subscribe({
      complete: () => {
        this.loginError = false;
        this.contraError = false;
        this.userError = false;
      },
      error: (err) => {
        console.error('Error al registrar', err);
        this.loginError = true;
      }
    });
    this.router.navigate(['login'])
        }
      });
    }else{
      console.log('confirmar Contraseña inválido');
      this.loginError = true;
      this.contraError = true;
      return;
    }
    
  }

}
