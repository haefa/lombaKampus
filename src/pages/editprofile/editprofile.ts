import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  gotoProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }
}