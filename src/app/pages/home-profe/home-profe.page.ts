import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-profe',
  templateUrl: './home-profe.page.html',
  styleUrls: ['./home-profe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class HomeProfePage implements OnInit {
  userInfoReceived: Observable<UserModel>;
  idUserHtmlRouterLink: any;

  constructor(private router: Router, private _usuarioService: UserService) {
    const userId = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(userId);
    this.userInfoReceived = this._usuarioService.getUser(userId);
   }

  ngOnInit() {
  }
  asistencia(){
    this.router.navigate(['asistencia'])
  }

  lista(){
    this.router.navigate(['lista-asistencia'])
  }
}
