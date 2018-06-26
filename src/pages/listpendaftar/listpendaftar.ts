import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditLombaPage } from '../editlomba/editlomba';

/**
 * Generated class for the ListpendaftarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listpendaftar',
  templateUrl: 'listpendaftar.html',
})
export class ListPendaftarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListpendaftarPage');
  }

  editLomba() {
    this.navCtrl.push(EditLombaPage);
  }

}
