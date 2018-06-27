import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ListPendaftarPage } from '../listpendaftar/listpendaftar';
import { Data } from '../../provider/data';

import * as moment from 'moment';
import { Http } from '@angular/http';

/**
 * Generated class for the EditlombaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editlomba',
  templateUrl: 'editlomba.html',
})
export class EditLombaPage {
  id_lomba: number;
  id_user: number;

  title: string;
  description: string;
  category: string;
  campus: string;
  startdate: any;
  enddate:any;
  members: number;
  fee: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
  ) {
    this.data.getData().then((data)=>
    {
    console.log(data);
    this.id_user =  data.id_user;
    })

    let temp = this.navParams.data;
    this.title = temp.nama_lomba;
    this.description = temp.deskripsi;
    this.startdate = moment(temp.tanggal_dibuat).format('YYYY-MM-DD');
    this.enddate = moment(temp.tanggal_ditutup).format('YYYY-MM-DD');
    this.members = temp.max_anggota;
    this.fee = temp.biaya;
    this.category = temp.kategori;
    this.campus = temp.tempat;
    this.id_lomba = temp.id_lomba;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditlombaPage');
  }

  saveLomba() {
    if(this.title && this.description  && this.category && this.campus && this.startdate && this.enddate && this.members && this.fee
    ) {

      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });

      loading.present();

      //apiPost
      let input = {
        id_lomba: this.id_lomba,
        nama_lomba :this.title,
        deskripsi: this.description, 
        tanggal_mulai: this.startdate,
        tanggal_ditutup: this.enddate,
        tempat: this.campus,
        biaya: this.fee,
        max_anggota: this.members,
        kategori: this.category,
        id_user: this.id_user,
      };
      console.log(input);
      this.http.post(this.data.BASE_URL+"/updateLomba",input).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==1){         
        this.navCtrl.push(ListPendaftarPage, input);      
        loading.dismiss();
      }
      else {
        loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Failed Updating Lomba',      
            buttons: ['OK']
          });
          alert.present();      
          loading.dismiss();
      }    
      });
      //apiPost  
    }

  }

}
