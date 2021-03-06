import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class Data {
  public BASE_URL = 'http://149.28.32.85:4444';

  public HAS_LOGGED_IN = 'status_login';
  
  constructor(public http: Http , public storage: Storage) {
    
  }

  login(data : any,role:string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    this.storage.set('role', role);
  };

  profile(data: any){
    this.storage.set('user_profile', data);
  }

  photo(data: any){
    this.storage.set('user_photo', data);
  }
  
  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_data');
    this.storage.remove('role');
    this.storage.remove('user_photo');
  };

  isLogin(){
    return this.storage.get(this.HAS_LOGGED_IN).then((value)=>{
      return value;
    });
  }

  getRole(){
    return this.storage.get('role').then((value)=>{
      return value;
    });
  }
  getData() {
    return this.storage.get('user_data').then((value) => {
      return value;
    });
  }
  getProfile() {
    return this.storage.get('user_profile').then((value) => {
      return value;
    });
  }

  getPhoto(){
    return this.storage.get('user_photo').then((value)=> {
      return value;
    });
  }
}