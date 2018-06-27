import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Data } from '../../provider/data';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notification: string = "activity";
  id_user: number;
  chatData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private data: Data,
    public http: Http,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController
  ) {
    this.data.getData().then((data=>{
      this.id_user = data.id_user;
      this.getChat();
    }
    ))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  chatDetails(chat){
    this.navCtrl.push(ChatPage, chat);
  }

  getChat(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);

    let input = {
      id_user: this.id_user, 
    };
    this.http.post(this.data.BASE_URL+"/semuaChat",input).subscribe(data => {
      let response = data.json();
      if(response.status!=0){    
        this.chatData = response.list;
        console.log(this.chatData);
      }
      loading.dismiss();
    });
  }

  findLomba(){
    this.navCtrl.push(HomePage);
  }

}
