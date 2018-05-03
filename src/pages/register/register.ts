import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  //deklarasi variabel
  submitted = false;

  name: string;
  email: string;
  password: string;
  confPass: string;
  telephone: number;
  address: string;

  isValidFormTelephone = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  checkTelephone(){
    console.log(this.telephone);
    if(this.telephone<0){
      this.isValidFormTelephone = false;
    }
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}