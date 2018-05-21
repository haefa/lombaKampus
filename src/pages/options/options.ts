import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { EditProfilePage } from '../editprofile/editprofile';
import { ChangePasswordPage } from '../changepassword/changepassword';
import { LoginPage } from '../login/login';
import { Data } from '../../provider/data';
import { OnboardingPage } from '../onboarding/onboarding';
import { Http } from '@angular/http';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  id_user: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App,
    private data: Data,
    public http: Http
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user = data.id_user;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  deleteAccount(){
    let confirm = this.alertCtrl.create({
      title: 'Delete Account?',
      message: 'Are you sure that you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete Account',
          handler: () => {
            console.log('Agree clicked');
            let input = {
              id_user: this.id_user, 
            };
            this.http.post(this.data.BASE_URL+"/hapusAkun",input).subscribe(data => {
              let response = data.json();
              if(response.status!=0){    
                let confirm = this.alertCtrl.create({
                  title: 'Account Deleted',
                  message: 'Please make new account to continue',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        console.log('OK clicked');
                        this.app.getRootNav().setRoot(OnboardingPage);
                      }
                    }
                  ]
                });
                confirm.present();
              }
              else{
                let confirm = this.alertCtrl.create({
                  title: 'Delete Account Failed',
                  message: 'Check your connection and try again.',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        console.log('OK clicked');
                      }
                    }
                  ]
                });
                confirm.present();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  signOut(){
    let confirm = this.alertCtrl.create({
      title: 'Sign Out?',
      message: 'Are you sure that you want to Sign Out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            console.log('Agree clicked');
            this.data.logout();  //hapus storage cache local  
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

  gotoEditProfilePage() {
    this.navCtrl.push(EditProfilePage);
  }

  gotoChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage);
  }

}
