import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';

import * as moment from 'moment';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  id_user: number;
  id_chat: number;
  tanggal: any;
  message: string;
  user_name: string;
  chatData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
  ) {
    let temp = this.navParams.data;
    this.id_chat = temp.id_user;
    this.user_name = temp.nama;

    if(temp.id_user == undefined){
      this.id_chat = temp[0];
      this.user_name = temp[1];
    }

    this.data.getData().then((data=>{
      this.id_user = data.id_user;
    
    this.getDetail();
    }
    ))
    console.log("woa",this.id_chat, this.user_name);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewWillEnter() {
    //ini ni ngambil value yang di return dari data.ts
    let loading = this.loadCtrl.create({
        content: 'loading..'
    });
    loading.present();
    
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
    
    this.getDetail();
    }
    ))
    loading.dismiss();

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }



  getDetail(){
    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    let input = {
      id_1: this.id_user,
      id_2: this.id_chat
    };
    this.http.post(this.data.BASE_URL+"/getChat",input).subscribe(data => {
      let response = data.json();
      if(response.status!=0){    
        this.chatData = response;
        console.log("tanggal-",response);
      }
      loading.dismiss();
    });
  }

  sendChat(){
    let loading = this.loadCtrl.create({
      content: 'loading..'
    });

    loading.present();

    let input = {
      id_pengirim: this.id_user,
      id_penerima: this.id_chat,
      pesan: this.message
    };
    this.http.post(this.data.BASE_URL+"/tambahChat",input).subscribe(data => {
      let response = data.json();
      if(response.status!=0){    
        this.getDetail();
      }
      this.message = "";
      loading.dismiss();
    });
  }

  delete(data){
    let confirm = this.alertCtrl.create({
      title: 'Delete chat?',
      message: 'Are you sure want to delete?',
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
              id_chat: data
            };
            this.http.post(this.data.BASE_URL+"/hapusChat",input).subscribe(data => {
              let response = data.json();
              if(response.status!=0){    
                this.getDetail();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }
  
  
}
