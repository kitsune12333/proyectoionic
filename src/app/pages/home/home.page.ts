import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router} from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  userInfoReceived: Observable<UserModel>;
  userModel: Observable<UserModel> | undefined;
  

  constructor(private router: Router, private _usuarioService: UserService) {
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
    
    
   }

   
   async getObject() {
    const { value } = await Preferences.get({ key: 'user' }); // Obtener el valor del Local Storage

    if (value) {
      this.userModel = JSON.parse(value); // Parsear el valor obtenido a un objeto UserModel
      console.log(this.userModel); // Puedes imprimirlo en la consola para verificar que se haya guardado correctamente
    }
  }

  ngOnInit() {
    this.getObject();
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

  
cerrar(){
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

}


