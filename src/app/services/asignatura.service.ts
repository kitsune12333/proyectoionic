import { Injectable } from "@angular/core";
import { AsignaturaModel } from "../models/AsignaturaModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  URL_SUPABASE = 'https://zlhulhiqqojomlvevdys.supabase.co/rest/v1/asignatura'

  constructor(private _httpclient: HttpClient) { }

  supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaHVsaGlxcW9qb21sdmV2ZHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1NzIzMjIsImV4cCI6MjAxMTE0ODMyMn0.ThnVkK7KkxpDDyp_pN1VGVOYZ4LrdZ8qMq0iUA_aaKI')

  

  getAllAsignatura(): Observable<any>{
    return this._httpclient.get<any>(this.URL_SUPABASE+'?*', { headers: this.supabaseheaders})
  }

  postAsignatura(asignaturaModel: AsignaturaModel): Observable<AsignaturaModel[]> {
    console.log(this.supabaseheaders);
    return this._httpclient.post<any[]>(this.URL_SUPABASE, asignaturaModel,{ headers: this.supabaseheaders, responseType: 'json' });
  }

}