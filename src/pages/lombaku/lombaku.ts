import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateLombaPage } from '../createlomba/createlomba';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';

@Component({
  selector: 'page-lombaku',
  templateUrl: 'lombaku.html',
})
export class LombakuPage {
  lomba: string = "participants";

  lombah: any;
  id_lomba: number;
  nama_lomba: string;
  deksripsi: string;
  tanggal_dibuat: any;
  tanggal_mulai: any;
  tanggal_ditutup: any;
  id_user: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public data: Data
  ) {
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
    this.getLomba();
    } ))
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

  getLomba(){
    var input = {
      id_user: this.id_user
    };
    this.http.post(this.data.BASE_URL+"/getLombaId", input).subscribe(data => {
      let response = data.json();
      this.lombah = response;
        console.log(response);
    });
  }

}
