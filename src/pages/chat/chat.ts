import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  id_user: number;
  id_chat: number;
  chatData: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
  ) {
    let temp = this.navParams.data;
    this.id_chat = temp;

    this.data.getData().then((data=>{
      this.id_user = data.id_user;
    
    this.getDetail();
    }
    ))
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  getDetail(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    let input = {
      id_1: this.id_user,
      id_2: this.id_chat
    };
    this.http.post(this.data.BASE_URL+"/getChat",input).subscribe(data => {
      let response = data.json();
      if(response.status!=0){    
        this.chatData = response;
        console.log(response);
      }
      loading.dismiss();
    });
  }

  sendChat(data){
    console.log(data);
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    let input = {
      id_pengirim: this.id_user,
      id_penerima: this.id_chat,
      pesan: data
    };
    this.http.post(this.data.BASE_URL+"/tambahChat",input).subscribe(data => {
      let response = data.json();
      if(response.status!=0){    
        this.getDetail();
      }
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
