import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  verAsistencia(){
    this.router.navigate(['lista-asistencia'])
  }

}
