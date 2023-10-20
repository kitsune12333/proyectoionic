import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_SUPABASE = 'https://xkwajudfhpaawwqdzwok.supabase.co/rest/v1/users'

  constructor(private _httpclient: HttpClient) {

   }

   supabaseheaders = new HttpHeaders()
        .set('apikey', 'AQUI VA SU API KEY')

   getUserListSupaBase(): Observable<UserModel[]> {
          console.log(this.supabaseheaders);
          return this._httpclient.get<UserModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders, responseType: 'json' });
      }
      getUser(user_id: string): Observable<UserModel>{
        return this._httpclient.get<UserModel>(this.URL_SUPABASE+'?user_id=eq.'+user_id,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getLoginUser(username: string, password: string): Observable<UserModel>{
      return this._httpclient.get<UserModel>(this.URL_SUPABASE+'?select=user_id,first_name,last_name,email,phone,type(id,name),created_at,empresas(id,name)&username=eq.'+username+'&password=eq.'+password,{ headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
  }
  
}
