import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  submitted = false;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private data: Data
  ) {
    this.testApi();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    if(this.email && this.password){
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();

      //apiPost
      let input = {
        email: this.email, 
        password: this.password
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/login",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){    
        this.data.logout();
        
        this.data.login(response,"user");//ke lokal
        
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Login Failed',      
            message : 'please try again',
            buttons: ['OK']
          });
          alert.present();
          
      }    
      });
      //apiPost    
    }
  }

  signUp(){
    this.navCtrl.push(RegisterPage);
  }

  home(){
    this.navCtrl.push(TabsPage);
  }

  testApi(){
    this.http.get("http://149.28.34.102/ping").subscribe(data=>{
      console.log(data);
    })
  }

}
