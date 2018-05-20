import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterLombaPage } from '../registerlomba/registerlomba';

@Component({
  selector: 'page-lomba-detail',
  templateUrl: 'lomba-detail.html',
})
export class LombaDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LombaDetailPage');
  }

  registerLomba() {
    this.navCtrl.push(RegisterLombaPage);
  }

}
