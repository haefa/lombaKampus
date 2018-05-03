import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditProfilePage } from '../editprofile/editprofile';
import { ChangePasswordPage } from '../changepassword/changepassword';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  gotoEditProfilePage() {
    this.navCtrl.push(EditProfilePage);
  }

  gotoChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage);
  }

}
