import { Injectable } from "@angular/core";
import { AsistenciaModel } from "../models/AsistenciaModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  URL_SUPABASE = 'https://zlhulhiqqojomlvevdys.supabase.co/rest/v1/asistencia'

  constructor(private _httpclient: HttpClient) { }

  supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaHVsaGlxcW9qb21sdmV2ZHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1NzIzMjIsImV4cCI6MjAxMTE0ODMyMn0.ThnVkK7KkxpDDyp_pN1VGVOYZ4LrdZ8qMq0iUA_aaKI')

  getAsistencia(id_user: string): Observable<any>{
    return this._httpclient.get<any>(this.URL_SUPABASE+'?id_user=eq.'+id_user, { headers: this.supabaseheaders})
  }

  postAsistencia(asistenciaModel: AsistenciaModel): Observable<AsistenciaModel[]> {
    console.log(this.supabaseheaders);
    return this._httpclient.post<any[]>(this.URL_SUPABASE, asistenciaModel,{ headers: this.supabaseheaders, responseType: 'json' });
  }

  getLastAsistenciaId(id: number): Observable<any> {
    return this._httpclient.get<any>(this.URL_SUPABASE+'id=eq.'+id ,{ headers: this.supabaseheaders});

}
}