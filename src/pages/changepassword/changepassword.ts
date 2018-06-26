import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { OptionsPage } from '../options/options';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangePasswordPage {
  //deklarasi variabel
  submitted = false;

  pass: string;
  newpassword: string;
  verifypassword: string;
  id_user: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private data: Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.data.getData().then((data=>{
      this.id_user = data.id_user;

    } ))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  changePass(){
    if(this.pass && (this.newpassword == this.verifypassword)){
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();
      
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
      //apiPost
      let input = {
        id_user: this.id_user,
        passlama: this.pass, 
        passbaru: this.newpassword
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/ubahPassword",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){    
        loading.dismiss();
        this.navCtrl.push(ProfilePage);
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Change Password Failed',      
            message : 'please try again',
            buttons: ['OK']
          });
          alert.present();
          
      }    
      });
      //apiPost    
    }
  }

  gotoOptionsPage() {
    this.navCtrl.push(OptionsPage);
  }

}
