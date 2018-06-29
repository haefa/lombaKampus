import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RegisterLombaPage } from '../registerlomba/registerlomba';
import { ChatPage } from '../chat/chat';
import { Data } from '../../provider/data';

import * as moment from 'moment';


@Component({
  selector: 'page-lomba-detail',
  templateUrl: 'lomba-detail.html',
})
export class LombaDetailPage {
  title: string;
  description: string;
  category: string;
  campus: string;
  startdate: any;
  enddate:any;
  members: number;
  fee: number;
  tnc: string;
  prize: string;
  id_lomba: number;
  id_creator: number;
  contact: number;
  name: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
  ) {
    let temp = this.navParams.data;
    //this.name = "fatim";

    this.title = temp.nama_lomba;
    this.description = temp.deskripsi;
    this.startdate = moment(temp.tanggal_dibuat).format('YYYY-MM-DD');
    this.enddate = moment(temp.tanggal_ditutup).format('YYYY-MM-DD');
    this.members = temp.max_anggota;
    this.fee = temp.biaya;
    this.category = temp.kategori;
    this.campus = temp.tempat;
    this.id_lomba = temp.id_lomba;
    this.tnc = temp.aturan;
    this.prize = temp.hadiah;
    this.id_creator = temp.id_user;
    this.contact = temp.no_hp;
    this.name = temp.nama_user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LombaDetailPage');
  }

  registerLomba(data) {
    this.navCtrl.push(RegisterLombaPage, data);
  }

  chat(data) {
    console.log("kirimm",data);
    this.navCtrl.push(ChatPage, data);
  }

}
