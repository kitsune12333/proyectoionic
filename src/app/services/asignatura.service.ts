import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Asignatura } from "../models/Asignatura"; // Asegúrate de importar la clase Asignatura

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  URL_SUPABASE = 'https://zlhulhiqqojomlvevdys.supabase.co/rest/v1/asignatura'
  private supabaseheaders = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaHVsaGlxcW9qb21sdmV2ZHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1NzIzMjIsImV4cCI6MjAxMTE0ODMyMn0.ThnVkK7KkxpDDyp_pN1VGVOYZ4LrdZ8qMq0iUA_aaKI');

  constructor(private _httpclient: HttpClient) {}

  getAllAsignaturas(): Observable<any>{
    return this._httpclient.get<any>(this.URL_SUPABASE+'?*', { headers: this.supabaseheaders})
  }
  
  getAsignaturas(nombre: string): Observable<Asignatura>{
    return this._httpclient.get<Asignatura>(this.URL_SUPABASE+'?select=*&nombre=eq.'+nombre, { headers: this.supabaseheaders})
  }
  

  guardarAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    const url = this.URL_SUPABASE;
    return this._httpclient.post<Asignatura>(url, asignatura, { headers: this.supabaseheaders });
  }
}