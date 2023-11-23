import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrCode: SafeResourceUrl | undefined;
  dato: string = ''; // Agrega esta línea para inicializar la variable dato

  constructor(private sanitizer: DomSanitizer) {}

  generarQr() {
    const data = this.dato || 'DefaultDato'; // Usa el valor ingresado o un valor por defecto
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
    this.qrCode = url
  }
}