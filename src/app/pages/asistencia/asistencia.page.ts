import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterLinkWithHref } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { Asignatura } from 'src/app/models/Asignatura';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, HttpClientModule, NgFor, NgForOf, ReactiveFormsModule],
  providers: [AsignaturaService, UserService]
})
export class AsistenciaPage implements OnInit {
  userId!: string;
  classForm: FormGroup;
  classError: boolean = false;
  qrCode: SafeResourceUrl | undefined;
  dato: string = ''; // Agrega esta línea para inicializar la variable dato
  userInfoReceived!: Observable<UserModel>;
  asignaturaData: Asignatura = {
    nombre: '',
    hora_ini: '',
    hora_ter: '',
    dia: '',
    profesor: ''
  };
  constructor(private router: Router, private _usuarioService: UserService,private formBuilder: FormBuilder,private sanitizer: DomSanitizer ,private _asignaturaService: AsignaturaService) { 
    this.classForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      hora_ini: ['', [Validators.required]],
      hora_ter: ['', [Validators.required]],
      dia: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.userId);
    localStorage.setItem("user", this.userId);
    this.userInfoReceived = this._usuarioService.getUser(this.userId);
  }
  guardarClase() {
    if (this.classForm.invalid) {
      console.log("clase invalida")
      this.classError = true;
      return;
    }
    this._asignaturaService.getAsignaturas(this.classForm.value.nombre).subscribe({
      complete: () => {
        console.log('materia tomada');
        this.asignaturaData.nombre = this.classForm.value.nombre;
        this.asignaturaData.hora_ini = this.classForm.value.hora_ini;
        this.asignaturaData.hora_ter = this.classForm.value.hora_ter;
        this.asignaturaData.dia = this.classForm.value.dia;
        this.asignaturaData.profesor = this.userId;
        console.info(this.asignaturaData)
        this._asignaturaService.guardarAsignatura(this.asignaturaData).subscribe({
          
          complete:() => {
            console.log("exito al registrar clase")
            this.classError = false;
          },
          error: (err) => {
            console.error('Error al registrar', err);
            this.classError = true;
          },
        })
        
      },
      error: () => {
        console.log('formulario error');
        
      }
    });

  }

  vermisclases(){
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
              this.router.navigate(['mis-clases'], userInfoSend)
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
