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
  

  constructor(private router: Router, private _usuarioService: UserService) {
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
    
   }



  ngOnInit() {
    
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


