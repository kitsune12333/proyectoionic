import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AsistenciaPage implements OnInit {
  
  userInfoReceived: Observable<UserModel>;

  constructor(private router: Router, private _usuarioService: UserService) { 
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
  }

  ngOnInit() {
    this.userInfoReceived.subscribe(
      { 

        next: (user) => {
          console.log(user);
          this._usuarioService.getLoginUser(user.correo , user.password).subscribe({
            next: (usuario) => {
              if (usuario) {
                //EXISTE
                console.log("Usuario existe y autentificado");
              } 
            },
            error: (err) => {
              console.log('error al ubicar y autentificar usuario');
              this.router.navigate(['/login']);
            },
            complete: () => {
    
            }
          })
        },
        error: (err) => {
          console.log('error al autentificar usuario');
          this.router.navigate(['/login']);
        },
        complete: () => {

        }
      }
    )
  }

  setObject(user: UserModel) {
    Preferences.set({
       key: 'user',
       value: JSON.stringify(user)
     });
   }

  verAsistencia(){
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
            this.setObject(user);
            console.log(userInfoSend);
            if (user.tipoUsuario == 'profesor') {
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

}
