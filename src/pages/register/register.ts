import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

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
  handphone: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signUp(){
    if(this.nama && this.email && this.password && (this.password == this.confPass) && this.jenis_kelamin && this.universitas && this.nim && this.handphone) {

      let loading = this.loadCtrl.create({
        content: 'loading..'
      });

      loading.present();
      
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
      //apiPost
      let input = {
        nama :this.nama,
        email: this.email, 
        password: this.password,
        jenis_kelamin: this.jenis_kelamin,
        universitas: this.universitas,
        no_ktm: this.nim,
        no_hp: this.handphone
      };
      console.log(this.nama);
      this.http.post(this.data.BASE_URL+"/buatAkun",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){    
        let alert = this.alertCtrl.create({
          title: 'Sign Up Successful', 
          message: 'Please login to continue',     
          buttons: ['OK']
        });
        alert.present();

        this.data.logout();  //hapus storage cache local  
        this.app.getRootNav().setRoot(LoginPage);    
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
      }    
      });
      //apiPost  
    }
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}
