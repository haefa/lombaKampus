import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  //deklarasi variabel
  nama: string;
  email: string;
  password: string;
  confPass: string;
  nim: string;
  jenis_kelamin: string;
  universitas: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp(){
    if(this.nama && this.email && this.password && (this.password == this.confPass) && this.jenis_kelamin && this.universitas && this.nim) {

      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();

      //apiPost
      let input = {
        nama :this.nama,
        email: this.email, 
        password: this.password,
        jenis_kelamin: this.jenis_kelamin,
        universitas: this.universitas,
        no_ktm: this.nim,
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/buatAkun",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){    
        this.data.logout();
        
        this.data.login(response.data,"user");//ke lokal
        
        this.navCtrl.setRoot(TabsPage);      
        loading.dismiss();
      }
      else if(response.status==409) {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Email Already Taken',      
            buttons: ['OK']
          });
          alert.present();
          loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed Creating New Account',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    }
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}
