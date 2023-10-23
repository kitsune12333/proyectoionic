import { Injectable } from "@angular/core";
import { UserRegister } from "../models/UserRegister";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  URL_SUPABASE = 'https://zlhulhiqqojomlvevdys.supabase.co/rest/v1/user'

  constructor(private _httpclient: HttpClient) {

   }

   supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaHVsaGlxcW9qb21sdmV2ZHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1NzIzMjIsImV4cCI6MjAxMTE0ODMyMn0.ThnVkK7KkxpDDyp_pN1VGVOYZ4LrdZ8qMq0iUA_aaKI')

   ingresarUsuario(userRegister: UserRegister): Observable<UserRegister[]> {
          console.log(this.supabaseheaders);
          return this._httpclient.post<any[]>(this.URL_SUPABASE, userRegister,{ headers: this.supabaseheaders, responseType: 'json' });
      }
      
}
