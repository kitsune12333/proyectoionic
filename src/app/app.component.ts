import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [];
  constructor() {}
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    // Borrar el usuario del localStorage al cerrar la pestaña
    localStorage.removeItem('user');
  }
}
