import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateLombaPage } from '../createlomba/createlomba';

@Component({
  selector: 'page-lombaku',
  templateUrl: 'lombaku.html',
})
export class LombakuPage {
  lomba: string = "participants";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LombakuPage');
  }

  joinLomba() {
    this.navCtrl.push(HomePage);
  }

  createLomba() {
    this.navCtrl.push(CreateLombaPage);
  }

}
