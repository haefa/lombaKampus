import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EditProfilePage } from '../editprofile/editprofile';
import { ChangePasswordPage } from '../changepassword/changepassword';
import { LoginPage } from '../login/login';
import { Data } from '../../provider/data';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private data: Data
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  signOut(){
    let confirm = this.alertCtrl.create({
      title: 'Sign Out?',
      message: 'are you sure want to Sign Out?',
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
            this.navCtrl.setRoot(LoginPage);
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
