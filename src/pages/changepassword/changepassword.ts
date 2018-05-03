import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { OptionsPage } from '../options/options';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  gotoOptionsPage() {
    this.navCtrl.push(OptionsPage);
  }

}
