import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-registerlomba',
  templateUrl: 'registerlomba.html',
})
export class RegisterLombaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterLombaPage');
  }

  joinLomba() {
    let alert = this.alertCtrl.create({
      title: 'Register Lomba',
      message: 'Are you sure that you want to participate this Lomba?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: () => {
            console.log('Register clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
