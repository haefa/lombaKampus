import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public skip: boolean = true;

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  start(){
    this.skip = false;
  }

  gotoLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
}
