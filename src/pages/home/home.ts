import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LombaDetailPage } from '../lomba-detail/lomba-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
  ) {

  }

  gotoLombaDetail(){
    this.navCtrl.push(LombaDetailPage);
  }

}
