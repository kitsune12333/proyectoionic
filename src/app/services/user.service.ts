import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_SUPABASE = 'https://zlhulhiqqojomlvevdys.supabase.co/rest/v1/user'

  constructor(private _httpclient: HttpClient) {

   }

   supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaHVsaGlxcW9qb21sdmV2ZHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1NzIzMjIsImV4cCI6MjAxMTE0ODMyMn0.ThnVkK7KkxpDDyp_pN1VGVOYZ4LrdZ8qMq0iUA_aaKI')

   getUserListSupaBase(): Observable<UserModel[]> {
          console.log(this.supabaseheaders);
          return this._httpclient.get<UserModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders, responseType: 'json' });
      }
      getUser(id: string): Observable<UserModel>{
        return this._httpclient.get<UserModel>(this.URL_SUPABASE+'?id=eq.'+id,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getLoginUser(correo: string, password: string): Observable<UserModel>{
      return this._httpclient.get<UserModel>(this.URL_SUPABASE+'?select=id,username,correo,telefono,tipoUsuario,nombre,tipoCarrera&correo=eq.'+correo+'&password=eq.'+password,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
  }
  
}
