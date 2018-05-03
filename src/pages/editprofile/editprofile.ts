import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditProfilePage {
  //deklarasi variabel
  submitted = false;

  name: string;
  nim: string
  email: string;
  telephone: number;
  campus: string;
  isValidFormTelephone = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  gotoProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  checkTelephone(){
    console.log(this.telephone);
    if(this.telephone<0){
      this.isValidFormTelephone = false;
    }
  }
}
