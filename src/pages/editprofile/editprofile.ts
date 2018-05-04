import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  gotoProfilePage() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..",
      duration: 300
    });
    loader.present();
    this.navCtrl.setRoot(ProfilePage);
  }

  checkTelephone(){
    console.log(this.telephone);
    if(this.telephone<0){
      this.isValidFormTelephone = false;
    }
  }
}
