import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreateLombaPage } from '../createlomba/createlomba';
import { Http } from '@angular/http';
import { Data } from '../../provider/data';
import { ListPendaftarPage } from '../listpendaftar/listpendaftar';
import { ListJoinedPage } from '../listjoined/listjoined';

@Component({
  selector: 'page-lombaku',
  templateUrl: 'lombaku.html',
})
export class LombakuPage {
  lomba: string = "participants";

  lombah: any;
  joined: any;

  id_joined: number;
  joined_title: string;
  joined_date: any;

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
    public data: Data,
    public loadCtrl: LoadingController
  ) {
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
    this.getLomba();
    this.getJoined();
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
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
      id_user: this.id_user
    };
    this.http.post(this.data.BASE_URL+"/getLombaId", input).subscribe(data => {
      let response = data.json();
      this.lombah = response;
      if(response.length == 0){
        this.lombah = undefined;
      }
        console.log("lombah ",this.lombah);
    });
  }

  getJoined(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    var input = {
      id_anggota: this.id_user
    };
    this.http.post(this.data.BASE_URL+"/getLombaSaya", input).subscribe(data => {
      let response = data.json();
      this.joined = response;
      if(response.length == 0){
        this.joined = undefined;
      }
        console.log(response);
    });
  }

  listPendaftar(lomba) {
    this.navCtrl.push(ListPendaftarPage, lomba);
  }

  delete(data, data2){
    let confirm = this.alertCtrl.create({
      title: 'Delete lomba?',
      message: 'Are you sure want to delete '+ data2 + '?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
        
            let input = {
              id_lomba: data
            };
            this.http.post(this.data.BASE_URL+"/hapusLomba",input).subscribe(data => {
              let response = data.json();
              if(response.status!=0){    
                this.getLomba();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  listJoined(lomba) {
    this.navCtrl.push(ListJoinedPage, lomba);
  }

}
