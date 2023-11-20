import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AsistenciaPage implements OnInit {
  
  userInfoReceived!: Observable<UserModel>;

  constructor(private router: Router, private _usuarioService: UserService) { 
    
  }

  ngOnInit() {
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    localStorage.setItem("user", userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
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
